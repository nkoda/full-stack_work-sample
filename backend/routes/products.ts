import express, { Router } from 'express';
import { 
    addProduct, 
    getAllProducts, 
    getProductById,
    updateProduct
} from '../controllers/products';

const router: Router = express.Router();

router.post('/addProduct', addProduct);

router.get('/getProducts', getAllProducts);

router.get('/getProducts/:id', getProductById);

router.post('/updateProduct/:id', updateProduct);

export default router;