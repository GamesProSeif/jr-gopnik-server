import Guild from './../models/guild';
import { IGuild } from '../typings/interfaces';

const listGuilds: any = () => {
  return new Promise((res: any, rej: any) => {
    (async () => {
      try {
        const guilds: IGuild[] = await Guild.find({});
        res(guilds);
      } catch (error) {
        rej(error.message);
      }
    })();
  });
};

const getGuild: any = (guild_id: IGuild['guild_id']) => {
  return new Promise((res: any, rej: any) => {
    (async () => {
      try {
        const guild: IGuild = await Guild.findOne({ guild_id });

        if (guild) res(guild);
        else res(null);
      } catch (error) {
        rej(error.message);
      }
    })();
  });
};

const addGuild: any = (guild_id: IGuild['guild_id']) => {
  return new Promise((res: any, rej: any) => {
    try {
      const guild: IGuild = new Guild({ guild_id });

      guild.save((err: any) => {
        if (err) rej(err);
        res(guild);
      });
    } catch (error) {
      rej(error.message);
    }
  });
};

const deleteGuild: any = (guild_id: IGuild['guild_id']) => {
  return new Promise((res: any, rej: any) => {
    try {
      Guild.findOneAndDelete({ guild_id }, (err: any, guild: IGuild) => {
        if (err) rej({ error: err });
        res({ guild });
      });
    } catch (error) {
      rej({ error: error.message });
    }
  });
};

export { getGuild, listGuilds, addGuild, deleteGuild };
