import Users from '../data_models/user';
import PartyManager from './party_manager';
import Costumes from '../data_models/costume';
import { DiscordSnowflake } from '@sapphire/snowflake';
import cache from '../../utils/cache';
import { Collection } from 'discord.js';

class UserManager {
  /**
   * @param {import('discord.js').Client} client
   */
  constructor(client, userid) {
    this.client = client;
    this.userid = userid;
  }

  async #getUser() {
    return await Users.findById(this.userid);
  }

  static async getUser(userid) {
    return await Users.findById(userid);
  }

  async getCostume(id) {
    return await Costumes.findById(id);
  }

  async registerUser() {
    const dUser = await this.client.users.fetch(this.userid);
    const user = new Users({
      _id: this.userid,
      username: dUser?.username || 'Unknown',
    });
    return await user.save();
  }

  async registerCostume(name, type, imageLink) {
    const _id = DiscordSnowflake.generate().toString();
    const costume = new Costumes({ _id, name, type, img_src: imageLink });
    return await costume.save();
  }

  async changeCloneName(name) {
    let user = await this.#getUser();
    if (!user) user = await this.registerUser();
    user.clone_name = name;
    await user.save();
  }
  async changeCostume(costumeId) {
    let user = await this.#getUser();
    if (!user) user = await this.registerUser();
    user.costume_id = costumeId;
    await user.save();
  }

  static async getDefaultCostumes() {
    if (cache.default_costumes.size)
      return Array.from(cache.default_costumes.values());
    const costumes = await Costumes.find({ type: 'default' });
    cache.default_costumes = new Collection(
      costumes.map(costume => [costume._id, costume])
    );
    return costumes;
  }

  async joinParty(partyId) {
    const user = await this.#getUser();
    if (!user) return this.#asyncError('user needs to get started');
    if (user.party_id) return this.#asyncError('User already in a party');

    const partyManager = await PartyManager.fetchParty(this.client, partyId);
    const channel = await partyManager.addPlayer(this.userid);
    return channel;
  }

  async send(message) {
    const user = await this.#getUser();
    if (!user.secret_webhook_id) this.#asyncError('user needs to join a party');

    const webhook = await this.client.fetchWebhook(user.secret_webhook_id);

    await webhook.send({
      username: user.clone_name,
      // todo: retrieve costume img src and use as avatar
      content: message,
    });
  }

  static async getParty(userid) {
    const user = await Users.findById(userid);
    return user?.party_id;
  }

  static async getCloneName(userid) {
    const user = await Users.findById(userid);
    return user?.clone_name;
  }

  #asyncError(message) {
    return Promise.reject(new Error(message));
  }
}

export default UserManager;
