import express, { Router } from 'express';
import { 
    addProduct, 
    getAllProducts, 
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/products';

const router: Router = express.Router();
 

export default router;