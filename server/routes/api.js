const { Router } = require('express');
const { join } = require('path');
const fetch = require('node-fetch');
const { validateID, parseSettings } = require(join(
  __dirname,
  '..',
  '..',
  'helpers',
  'general.js'
));
const { getGuild, listGuilds, addGuild } = require(join(
  __dirname,
  '..',
  '..',
  'helpers',
  'guild.js'
));

const router = new Router();
const discordAPI = 'https://discordapp.com/api';

router.get('/', (req, res) => {
  res.status(400).json({
    error: 'Main API page. Specify a valid API url. See docs'
  });
});

router.get('/guilds', async (req, res) => {
  try {
    if (req.headers.apikey !== process.env.TEST_API_KEY) {
      return res.status(401).json({ error: 'Missing access' });
    }
    let guilds = await listGuilds();

    const copiedArr = guilds.map(guild => {
      const copiedObj = JSON.parse(JSON.stringify(guild));
      copiedObj.linkURL = `${req.protocol}://${req.get('host')}/api/guilds/${
        guild.guild_id
      }`;
      return copiedObj;
    });

    return res.status(200).json(copiedArr);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/guilds/:guild_id', async (req, res) => {
  if (req.headers.apikey !== process.env.TEST_API_KEY) {
    return res.status(401).json({ error: 'Missing access' });
  }
  if (!req.params.guild_id) {
    return res.status(400).json({ error: 'Missing guild ID parameter' });
  }

  if (!validateID(req.params.guild_id)) {
    return res.status(400).json({ error: 'Invalid guild ID' });
  }

  const guild = await getGuild(req.params.guild_id);

  if (!guild) {
    return res.status(404).json({ error: 'Guild not found' });
  }

  const data = await (await fetch(
    `${discordAPI}/guilds/${req.params.guild_id}`,
    {
      headers: {
        Authorization: `Bot ${process.env.GOPNIK_DISCORD_TOKEN}`
      }
    }
  )).json();

  delete data.id;
  // delete data.roles;
  // delete data.emojis;

  const copied = JSON.parse(JSON.stringify(guild));
  Object.assign(copied, data);

  res.status(200).json(copied);
});

router.post('/guilds', async (req, res) => {
  if (req.headers.apikey !== process.env.TEST_API_KEY) {
    return res.status(401).json({ error: 'Missing access' });
  }

  if (!req.query.id) {
    return res.status(400).json({ error: 'Missing guild ID query' });
  }

  if (!validateID(req.query.id)) {
    return res.status(400).json({ error: 'Invalid guild ID' });
  }

  try {
    const exists = await getGuild(req.query.id);

    if (exists) {
      return res
        .status(400)
        .json({ error: `Guild with ID ${req.query.id} already exists` });
    }

    const guild = await addGuild(req.query.id);
    res.status(200).json(guild);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/guilds/:id/settings', async (req, res) => {
  if (req.headers.apikey !== process.env.TEST_API_KEY) {
    return res.status(401).json({ error: 'Missing access' });
  }

  if (!req.params.id) {
    return res.status(400).json({ error: 'Missing guild ID parameter' });
  }

  if (!validateID(req.params.id)) {
    return res.status(400).json({ error: 'Invalid guild ID' });
  }

  try {
    const guild = await getGuild(req.params.id);

    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    const { parsed, error: parseError } = parseSettings(
      guild.settings,
      req.body
    );
    if (parseError) {
      return res.status(400).json({ error: parseError });
    }

    // Fix
    const dbResponse = await guild.updateOne(
      { guild_id: req.params.id },
      { settings: parsed }
    );

    res.status(200).json(dbResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
