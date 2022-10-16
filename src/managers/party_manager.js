import Parties from '../data_models/party';
import Users from '../data_models/user';
import Servers from '../data_models/server';
import { DiscordSnowflake } from '@sapphire/snowflake';

class PartyManager {
  /**
   * @param { import('discord.js').Client } client
   */
  constructor(client, serverId, partyId) {
    this.serverId = serverId;
    this.client = client;
    this.partyId = partyId;
  }

  /**
   * @param { import('discord.js').Client } client
   */
  static async start(client, serverId, name) {
    const partyId = DiscordSnowflake.generate().toString();
    const party = new Parties({
      _id: partyId,
      server_id: serverId,
      name,
    });
    await party.save();
    return new PartyManager(client, serverId, partyId);
  }

  /**
   * @param { import('discord.js').Client } client
   */
  static async fetchParties(serverId) {
    const server = await Servers.findById(serverId);
    if (!server) return this.#asyncError('Server doesnt exist'); // todo: improve this
    return await Promise.all(
      server.parties
        .map(async partyId => {
          const party = await Parties.findById(partyId);
          if (!party) return null;
          const { _id, name } = party;
          return { _id, name };
        })
        .filter(Boolean)
    );
  }

  async addPlayer(userid) {
    if (!this.partyId)
      return this.#asyncError(
        'use start method only to instantiate the manager'
      );

    const party = await Parties.findById(this.partyId);
    if (!party)
      return this.#asyncError(
        'this shouldnt have occured but party doesnt exist'
      );

    const user = await Users.findById(userid);
    if (!user) return this.#asyncError('User needs to get started');

    const guild = await this.client.guilds.fetch(party.server_id);
    const evRole = await guild.roles.fetch(guild.id);

    const channel = await guild.channels.create({
      name: `${Date.now()}`,
      reason: 'halloparty',
      permissionOverwrites: [
        { id: evRole, deny: 'ViewChannel' },
        { id: userid, allow: 'ViewChannel' },
      ],
    });
    const webhook = await channel.createWebhook({ name: 'HalloParty' });

    user.party_id = this.partyId;
    user.secret_webhook_id = webhook.id;
    party.users.push(userid);
  }

  async removePlayer(_userid) {}

  async removeParty() {}

  #asyncError(message) {
    return Promise.reject(new Error(message));
  }
}

export default PartyManager;
