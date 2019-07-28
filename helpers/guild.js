const { join } = require('path');
const Guild = require(join(__dirname, '..', 'models', 'guild.js'));

const listGuilds = () => {
  return new Promise((res, rej) => {
    (async () => {
      try {
        const guilds = await Guild.find({});
        res(guilds);
      } catch (error) {
        rej(error.message);
      }
    })();
  });
};

const getGuild = guild_id => {
  return new Promise((res, rej) => {
    (async () => {
      try {
        const guild = await Guild.findOne({ guild_id });

        if (guild) res(guild);
        else res(null);
      } catch (error) {
        rej(error.message);
      }
    })();
  });
};

const addGuild = guild_id => {
  return new Promise((res, rej) => {
    (async () => {
      try {
        const guild = new Guild({ guild_id });

        guild.save(err => {
          if (err) rej(err);
          res(guild);
        });
      } catch (error) {
        rej(error.message);
      }
    })();
  });
};

module.exports = { getGuild, listGuilds, addGuild };
