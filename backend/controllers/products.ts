import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Joi from 'joi';

import { Product } from '../models/products';

export const getAllProducts = (req: Request, res: Response) => { 
    Product.getAllProducts(products => res.status(200).json(products));
}

export const addProduct = async (req: Request, res: Response) => {
    try {
        validateAddProductRequest(req, res);
        const {
            productName,
            productOwnerName,
            developers,
            scrumMasterName,
            startDate,
            methodology
          } = req.body;
        const product = new Product(
        productName,
        productOwnerName,
        developers,
        scrumMasterName,
        startDate,
        methodology
        );
        product.saveToJSON();
        res.status(200).send('data recieved');
    } catch (error) {
        res.status(400).send(error)
    }
}

const validateAddProductRequest = (req: Request, res: Response) => {
    try {
        productSchema.validate(req.body, {abortEarly: false});
    } catch (error) {
        throw new Error('Invalid product parameters');
    }
}

const productSchema = Joi.object({
    productName: Joi.string().required(),
    productOwnerName: Joi.string().required(),
    developers: Joi.array().items(Joi.string()).min(1).max(5).required(),
    scrumMasterName: Joi.string().required(),
    startDate: Joi.date().required(),
    methodology: Joi.string().max(15)
})