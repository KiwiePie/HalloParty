import PartyManager from '../managers/party_manager';

/** @param { import('discord.js').Message } message*/
export async function messageCreate(message) {
  if (!message.inGuild) return;
  if (message.webhookId) return;
  const partyId = await PartyManager.isPartyChannel(
    message.client,
    message.channelId
  );
  if (!partyId) return;
  const partyManager = await PartyManager.fetchParty(message.client, partyId);
  await partyManager.send(message.author.id, message.content);
}
