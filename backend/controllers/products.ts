import { Request, Response } from 'express';
import Joi from 'joi';

import { Product } from '../models/products';

/**
Adds a new product.
@param {Request} req - The request object.
@param {Response} res - The response object.
@returns {Promise<void>}
- A promise that resolves when the creation is successful.
@throws {Error} 
- If the product request validation fails or an error occurs during the process.
*/
export const addProduct = async (req: Request, res: Response) => {
    try {
        validateProductRequest(req, res, addProductSchema);
        const {
            productName,
            productOwnerName,
            developers,
            scrumMasterName,
            startDate,
            methodology,
            location
        } = req.body;
        const product = new Product(
            productName,
            productOwnerName,
            developers,
            scrumMasterName,
            startDate,
            methodology,
            location
            );
            product.saveToJSON();
            res.status(200).send('data recieved');
        } catch (error) {
            res.status(400).send(error)
        }
}

/**
Retrieves all products.
@param {Request} req - The request object.
@param {Response} res - The response object.
@returns {Promise<void>}
- A promise that resolves when the retrieval is successful.
@throws {Error} - If an error occurs during the process.
*/
export const getAllProducts = async (req: Request, res: Response) => { 
  try {
    Product.getAllProducts(products => res.status(200).json(products));
  } catch (error) {
    res.status(400).send(error);
  }
}

/**
Retrieves a product by its ID.
@param {Request} req - The request object.
@param {Response} res - The response object.
@returns {Promise<void>}
- A promise that resolves when the retrieval is successful.
@throws {Error} - If an error occurs during the process.
*/
export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        validateProductId(id);
        Product.getProductById(id, product => res.status(200).json(product));
    } catch (error) {
        res.status(400).send(error);
    }
}

/**
Updates a product by its ID.
@param {Request} req - The request object.
@param {Response} res - The response object.
@returns {Promise<void>}
- A promise that resolves when the update is successful.
@throws {Error} - If an error occurs during the process.
*/
export const updateProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      validateProductId(id);
      validateProductRequest(req, res, updateProductSchema);
  
      const updatedFields: Record<string, any> = {
        productName: req.body.productName,
        productOwnerName: req.body.productOwnerName,
        developers: req.body.developers,
        scrumMasterName: req.body.scrumMasterName,
        startDate: req.body.startDate,
        methodology: req.body.methodology,
        location: req.body.location,
      };
  
      Product.updateProductById(id, updatedFields, err => {
        if (err) {
          throw new Error('Product deletion failed');
        }
        res.status(200).send('Successfully deleted product');
      });
    } catch (error) {
      res.status(400).send(error);
    }
};

/**
Deletes a product by its ID.
@param {Request} req - The request object.
@param {Response} res - The response object.
@returns {Promise<void>}
- A promise that resolves when the deletion is successful.
@throws {Error} - If an error occurs during the deletion process.
*/
export const deleteProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      validateProductId(id);
      Product.deleteProductById(id, err => {
        if (err) {
          throw new Error('Product deletion failed');
        }
        res.status(200).send('Successfully deleted product');
      });
    } catch (error) {
      res.status(400).send(error);
    }
};

/**
Validates the product request against a given schema.
@param {Request} req - The request object.
@param {Response} res - The response object.
@param {Joi.Schema} schema - The Joi schema to validate against.
@returns {void} 
@throws {Error} - If the product parameters are invalid.
*/
const validateProductRequest = (
    req: Request, 
    res: Response, 
    schema: Joi.Schema
    ) => {
    try {
        schema.validate(req.body, {abortEarly: false});
    } catch (error) {
        throw new Error('Invalid product parameters');
    }
}

/**
Validates the productID request against a uuid schema.
@param {string} id - The product id to validate against.
@returns {void} 
@throws {Error} - If the product parameters are invalid.
*/
const validateProductId =  (id: string) => {
    const schema = Joi.string().uuid();
    try {
        schema.validate(id);
    } catch (error) {
        throw new Error("Invalid product id");
    }
}

const addProductSchema = Joi.object({
    productName: Joi.string().required(),
    productOwnerName: Joi.string().required(),
    developers: Joi.array().items(Joi.string()).min(1).max(5).required(),
    scrumMasterName: Joi.string().required(),
    startDate: Joi.date().required(),
    methodology: Joi.string().max(15),
    location: Joi.string().uri().required()
})

const updateProductSchema = Joi.object({
    productName: Joi.string(),
    productOwnerName: Joi.string(),
    developers: Joi.array().items(Joi.string()).min(1).max(5),
    scrumMasterName: Joi.string(),
    startDate: Joi.date(),
    methodology: Joi.string().max(15),
    location: Joi.string().uri()
})