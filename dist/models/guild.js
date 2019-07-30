"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const myMap = new Map();
myMap.set('prefix', '/');
myMap.set('user_role', null);
myMap.set('bot_role', null);
myMap.set('auto_assign_roles', false);
myMap.set('member_logs_channel', null);
myMap.set('member_logging', false);
exports.defaultSettings = myMap;
const GuildSchema = new mongoose_1.Schema({
    guild_id: {
        type: String,
        required: true,
        unique: true
    },
    settings: {
        type: Map,
        default: exports.defaultSettings,
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
exports.default = mongoose_1.model('guilds', GuildSchema);
