import Users from '../data_models/user';
import Parties from '../data_models/party';

class UserManager {
  /**
   * @param {import('discord.js').Client} client
   */
  constructor(client, userid) {
    this.client = client;
    this.userid = userid;
  }

  async #getUser(userid) {
    return await Users.findById(userid);
  }

  async getStarted(cloneName, costumeId) {
    if (await this.#getUser()) return this.#asyncError('user already started');
    // todo: check if costume exists
    const user = new Users({
      _id: this.userid,
      clone_name: cloneName,
      costume_id: costumeId,
    });
    await user.save();
  }

  async changeCloneName(_name) {}
  async changeCostume(_costumeId) {}

  async joinParty(partyId) {
    const user = await this.#getUser(this.userid);
    if (!user) return this.#asyncError('user needs to get started');
    if (user.party_id) return this.#asyncError('User already in a party');

    const party = await Parties.findById(partyId);
    if (!party) return this.#asyncError('Wrong party id');

    const guild = await this.client.guilds.fetch(party.server_id);
    const channel = await guild.channels.create({
      name: `${Date.now()}`,
      reason: 'halloparty',
      permissionOverwrites: [
        { id: guild.roles.everyone, deny: 'ViewChannel' },
        { id: this.userid, allow: 'ViewChannel' },
      ],
    });
    const webhook = await channel.createWebhook({ name: 'HalloParty' });

    party.users.push(this.userid);
    user.party_id = partyId;
    user.secret_webhook_id = webhook.id;
  }

  async send(message) {
    const user = await this.#getUser(this.userid);
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

  #asyncError(message) {
    return Promise.reject(new Error(message));
  }
}

export default UserManager;
