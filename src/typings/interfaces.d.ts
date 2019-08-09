import { Document } from 'mongoose';

export interface IDisabled {
  command: string;
  channels: string[];
}

export interface ISettings extends Object {
  prefix: string;
  user_role: string;
  bot_role: string;
  auto_assign_roles: boolean;
  member_logs_channel: string;
  member_logging: boolean;
  disabled: IDisabled[];
}

export interface IGuild extends Document {
  guild_id: string;
  settings: ISettings;
}

export interface IMember extends Document {
  user: string;
  guild: string;
  roles: Array<string>;
  xp: number;
  presence: string;
}
