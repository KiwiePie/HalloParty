import { Collection, Webhook, Snowflake } from 'discord.js';

type Cache = {
  parties: Collection<String, Party>;
  non_party_channels: Array<ChannelId>;
  default_costumes: Collection<String, Costume>
};

type PartyId = Snowflake;

type Party = {
  _id: PartyId;
  name: string;
  server_id: ServerId;
  channels: Array<ChannelId>;
  users: Users;
  webhooks: Webhooks;
};

type User = {
  _id: UserId;
  clone_name: string;
  secret_webhook_id: string;
  costume_id: string;
  party_id: string;
};

type Users = Collection<UserId, User>;
type Webhooks = Collection<UserId, Webhook>;
type ServerId = Snowflake;
type ChannelId = Snowflake;
type UserId = Snowflake;

type Costume = {
  _id: string;
  type: string;
  name: string;
  img_src: string;
};
