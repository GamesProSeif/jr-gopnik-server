"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guild_1 = require("./../models/guild");
const listGuilds = () => {
    return new Promise((res, rej) => {
        (async () => {
            try {
                const guilds = await guild_1.default.find({});
                res(guilds);
            }
            catch (error) {
                rej(error.message);
            }
        })();
    });
};
exports.listGuilds = listGuilds;
const getGuild = (guild_id) => {
    return new Promise((res, rej) => {
        (async () => {
            try {
                const guild = await guild_1.default.findOne({ guild_id });
                if (guild)
                    res(guild);
                else
                    res(null);
            }
            catch (error) {
                rej(error.message);
            }
        })();
    });
};
exports.getGuild = getGuild;
const addGuild = (guild_id) => {
    return new Promise((res, rej) => {
        try {
            const guild = new guild_1.default({ guild_id });
            guild.save((err) => {
                if (err)
                    rej(err);
                res(guild);
            });
        }
        catch (error) {
            rej(error.message);
        }
    });
};
exports.addGuild = addGuild;
const deleteGuild = (guild_id) => {
    return new Promise((res, rej) => {
        try {
            guild_1.default.findOneAndDelete({ guild_id }, (err, guild) => {
                if (err)
                    rej({ error: err });
                res({ guild });
            });
        }
        catch (error) {
            rej({ error: error.message });
        }
    });
};
exports.deleteGuild = deleteGuild;
