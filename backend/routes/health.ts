import express, { Router } from 'express';

import { getHealthCheckHandler } from '../controllers/health';

const router: Router = express.Router();

router.get('/health', getHealthCheckHandler);

export default router;
