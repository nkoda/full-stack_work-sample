import express, { Router } from 'express';
import { 
    addProduct, 
    getAllProducts, 
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/products';

const router: Router = express.Router();

// Create a new product
router.post('/products', addProduct);

// Get all products
router.get('/products', getAllProducts);

// Get a specific product by ID
router.get('/products/:id', getProductById);

// Update a specific product by ID
router.put('/products/:id', updateProduct);

// Delete a specific product by ID
router.delete('/products/:id', deleteProduct);

export default router;