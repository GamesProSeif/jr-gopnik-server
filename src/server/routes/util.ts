import { Request, Response, Router } from 'express';
const { version } = require('../../../package.json');

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

router.get('/stats', (req: Request, res: Response) => {
  res.status(200).json({
    memoryUsage: process.memoryUsage().heapUsed,
    version
  });
});

module.exports = router;
