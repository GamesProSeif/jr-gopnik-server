"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedSettings = [
    'prefix',
    'user_role',
    'bot_role',
    'auto_assign_roles',
    'member_logs_channel',
    'member_logging',
    'disabled'
];
function validateID(id) {
    const reg = /^[0-9]{17,19}$/;
    return reg.test(id);
}
exports.validateID = validateID;
function parseSettings(guildSettings, settingsObj) {
    for (const [key, value] of Object.entries(settingsObj)) {
        if (!allowedSettings.includes(key)) {
            return { error: `${key} is not a valid settings key` };
        }
        if (['user_role', 'bot_role', 'member_logs_channel'].includes(key) &&
            !validateID(value)) {
            return { error: `${value} is not a valid ID` };
        }
        if (['auto_assign_roles', 'member_logging'].includes(key) &&
            typeof value !== 'boolean') {
            return { error: `Invalid value for ${key}. Expected Boolean` };
        }
        guildSettings[key] = value;
    }
    return { parsed: guildSettings };
}
exports.parseSettings = parseSettings;
