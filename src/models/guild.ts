import { Schema, model, Document } from 'mongoose';

export interface IGuild extends Document {
  guild_id: string;
  settings: Map<string, any>;
  member_add_text: Array<string>;
  member_leave_text: Array<string>;
}

const myMap: Map<string, any> = new Map();
myMap.set('prefix', '/');
myMap.set('user_role', null);
myMap.set('bot_role', null);
myMap.set('auto_assign_roles', false);
myMap.set('member_logs_channel', null);
myMap.set('member_logging', false);

export const defaultSettings = myMap;

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
