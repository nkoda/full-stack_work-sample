import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Joi from 'joi';

import { Product } from '../models/products';

export const addProduct = async (req: Request, res: Response) => {
    try {
        validateProductRequest(req, res, addProductSchema);
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
    
export const getAllProducts = async (req: Request, res: Response) => { 
    Product.getAllProducts(products => res.status(200).json(products));
}

export const getProductById = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        validateProductId(id);
        Product.getProductById(id, product => res.status(200).json(product));
    } catch (error) {
        res.status(400).send(error);
    }
}

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
        };
        Product.updateProductById(
            id, 
            updatedFields, 
            () => { res.status(200).send('Successfully updated Product')}
        );
    } catch (error) {
        res.status(400).send(error);
    }
}

const validateProductRequest = async (
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

const validateProductId = (id: string) => {
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
    methodology: Joi.string().max(15)
})

const updateProductSchema = Joi.object({
    productName: Joi.string(),
    productOwnerName: Joi.string(),
    developers: Joi.array().items(Joi.string()).min(1).max(5),
    scrumMasterName: Joi.string(),
    startDate: Joi.date(),
    methodology: Joi.string().max(15)
})