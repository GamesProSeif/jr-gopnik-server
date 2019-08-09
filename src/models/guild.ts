import { Schema, model } from 'mongoose';
import { ISettings, IGuild } from '../typings/interfaces';

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
    type: Object,
    default: defaultSettings,
    prefix: {
      type: String,
      default: '/'
    },
    user_role: String,
    bot_role: String,
    auto_assign_roles: Boolean,
    member_logs_channel: String,
    member_logging: Boolean,
    disabled: Array
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
