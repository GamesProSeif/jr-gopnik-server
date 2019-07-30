"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { version } = require('../../../package.json');
const router = express_1.Router();
router.get('/ping', (req, res) => {
    res.status(200).json({ ok: true });
});
router.get('/stats', (req, res) => {
    res.status(200).json({
        memoryUsage: process.memoryUsage().heapUsed,
        version
    });
});
module.exports = router;
