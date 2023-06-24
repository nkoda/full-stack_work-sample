import express, { Router } from 'express';

import { getHealthCheckHandler } from '../controllers/health';

const router: Router = express.Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     description: 
 *       Responds if the app is up and running with uptime and date.
 *     responses:
 *       200:
 *         description: App is up and running.
 */
router.get('/health', getHealthCheckHandler);

export default router;
