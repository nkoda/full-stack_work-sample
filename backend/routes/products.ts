import express, { Router } from 'express';

import { addProduct } from '../controllers/products';

const router: Router = express.Router();

router.post('/addProduct', addProduct);

export default router;