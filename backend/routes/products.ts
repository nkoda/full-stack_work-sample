import express, { Router } from 'express';

import { 
    addProduct, 
    getAllProducts, 
    getProductById 
} from '../controllers/products';

const router: Router = express.Router();

router.post('/addProduct', addProduct);

router.get('/getAllProducts', getAllProducts);

router.get('getProductById', getProductById);


export default router;