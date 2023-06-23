import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

import { Product } from '../models/products';

export const getAllProducts = (req: Request, res: Response) => { 
    Product.getAllProducts(products => res.status(200).json(products));
}

export const addProduct = async (req: Request, res: Response) => {
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
    product.save();
    res.status(200).send('data recieved');
}