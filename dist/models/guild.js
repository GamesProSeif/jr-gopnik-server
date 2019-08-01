"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.defaultSettings = {
    prefix: '/',
    user_role: null,
    bot_role: null,
    auto_assign_roles: false,
    member_logs_channel: null,
    member_logging: false,
    disabled: []
};
const GuildSchema = new mongoose_1.Schema({
    guild_id: {
        type: String,
        required: true,
        unique: true
    },
    settings: {
        type: Object,
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
