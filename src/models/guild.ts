import { Schema, model, Document } from 'mongoose';

export interface ISettings extends Object {
  prefix: string;
  user_role: string;
  bot_role: string;
  auto_assign_roles: boolean;
  member_logs_channel: string;
  member_logging: boolean;
  disabled: Array<string>;
}

export interface IGuild extends Document {
  guild_id: string;
  settings: ISettings;
}

export const defaultSettings: ISettings = {
  prefix: '/',
  user_role: null,
  bot_role: null,
  auto_assign_roles: false,
  member_logs_channel: null,
  member_logging: false,
  disabled: []
};

const GuildSchema = new Schema({
  guild_id: {
    type: String,
    required: true,
    unique: true
  },
  settings: {
    type: Map,
    default: defaultSettings,
    prefix: {
      type: String,
      default: '/'
    },
    user_role: String,
    bot_role: String,
    auto_assign_roles: Boolean,
    member_logs_channel: String,
    member_logging: Boolean
  },
  member_add_text: {
    type: Array,
    default: []
  },
  member_leave_text: {
    type: Array,
    default: []
  }
});

export default model<IGuild>('guilds', GuildSchema);
