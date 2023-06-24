import express, { Router } from 'express';
import { 
    addProduct, 
    getAllProducts, 
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/products';

const router: Router = express.Router();

/**
 * @openapi
 * /api/products:
 *   post:
 *     tags:
 *       - Product
 *     summary: Add a new product
 *     requestBody:
 *       description: Product details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productOwnerName:
 *                 type: string
 *               developers:
 *                 type: array
 *                 items:
 *                   type: string
 *               scrumMasterName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               methodology:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product added successfully
 *       400:
 *         description: Bad request or validation error or failed to add product
 */
router.post('/products', addProduct);

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Successfully returned all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *         description: Bad request or Failed to retrieve products
 */
router.get('/products', getAllProducts);

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Product
 *     summary: Retrieve a product by productID
  *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Successfully returned product
 *       400:
 *         description: Bad request or Failed to retrieve product
 */
router.get('/products/:id', getProductById);

/**
 * @openapi
 * /api/products:
 *   put:
 *     tags:
 *       - Product
 *     summary: Update a pre-existing product
 *     requestBody:
 *       description: Product details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productOwnerName:
 *                 type: string
 *               developers:
 *                 type: array
 *                 items:
 *                   type: string
 *               scrumMasterName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               methodology:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: 
 *           Bad request, validation error or failed to update product
 */
router.put('/products/:id', updateProduct);

/**
 * @openapi
 * /api/products:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Remove a product by productID
  *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to remove
 *     responses:
 *       200:
 *         description: Successfully deleted product
 *       400:
 *         description: Bad request or Failed to remove product
 */
router.delete('/products/:id', deleteProduct);

export default router;