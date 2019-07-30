"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_fetch_1 = require("node-fetch");
const general_1 = require("./../../helpers/general");
const guild_1 = require("./../../helpers/guild");
const router = express_1.Router();
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
        const guilds = await guild_1.listGuilds();
        const copiedArr = guilds.map(guild => {
            const copiedObj = JSON.parse(JSON.stringify(guild));
            copiedObj.linkURL = `${req.protocol}://${req.get('host')}/api/guilds/${guild.guild_id}`;
            return copiedObj;
        });
        return res.status(200).json(copiedArr);
    }
    catch (error) {
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
    if (!general_1.validateID(req.params.guild_id)) {
        return res.status(400).json({ error: 'Invalid guild ID' });
    }
    const guild = await guild_1.getGuild(req.params.guild_id);
    if (!guild) {
        return res.status(404).json({ error: 'Guild not found' });
    }
    const data = await (await node_fetch_1.default(`${discordAPI}/guilds/${req.params.guild_id}`, {
        headers: {
            Authorization: `Bot ${process.env.GOPNIK_DISCORD_TOKEN}`
        }
    })).json();
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
    if (!general_1.validateID(req.query.id)) {
        return res.status(400).json({ error: 'Invalid guild ID' });
    }
    try {
        const exists = await guild_1.getGuild(req.query.id);
        if (exists) {
            return res
                .status(400)
                .json({ error: `Guild with ID ${req.query.id} already exists` });
        }
        const guild = await guild_1.addGuild(req.query.id);
        res.status(200).json(guild);
    }
    catch (error) {
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
    if (!general_1.validateID(req.params.id)) {
        return res.status(400).json({ error: 'Invalid guild ID' });
    }
    try {
        const guild = await guild_1.getGuild(req.params.id);
        if (!guild) {
            return res.status(404).json({ error: 'Guild not found' });
        }
        const { parsed, error: parseError } = general_1.parseSettings(guild.settings, req.body);
        if (parseError) {
            return res.status(400).json({ error: parseError });
        }
        guild.settings = parsed;
        const dbResponse = await guild.save();
        res.status(200).json(guild);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.delete('/guilds/:id', async (req, res) => {
    if (req.headers.apikey !== process.env.TEST_API_KEY) {
        return res.status(401).json({ error: 'Missing access' });
    }
    if (!req.params.id) {
        return res.status(400).json({ error: 'Missing guild ID parameter' });
    }
    if (!general_1.validateID(req.params.id)) {
        return res.status(400).json({ error: 'Invalid guild ID' });
    }
    try {
        const { guild } = await guild_1.deleteGuild(req.params.id);
        if (guild)
            res.status(200).json(guild);
        else
            res.status(400).json({ error: 'Guild does not exist' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;
