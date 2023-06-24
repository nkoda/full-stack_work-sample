import fs from 'fs';
import path from 'path';
import { Product } from '../models/products';
/**
 * The path to the products data file.
 * @type {string}
 */
export const JSONProductsPath = path.join(
    path.dirname(
        require.main!.filename),
        '..',
        'data',
        'products.json'
    );

/**
 * Callback function for getting products from file.
 * @callback GetProductsCallback
 * @param {Product[]} products - The products retrieved from the file.
 * @returns {void}
 */
export const getProductsFromFile = (
    callback: (products: Product[]) => void): void => {
    fs.readFile(JSONProductsPath, (err: any, fileContent: Buffer) => {
        if (err) {
            callback([]);
        } else {
            const contentString: string = fileContent.toString();
            callback(JSON.parse(contentString));
        }
    });
};

/**
 * Callback function for writing products to file.
 * @callback WriteProductsCallback
 * @param {Error | void | null} error 
 *  - The error occurred during the write operation, if any.
 * @returns {void}
 */
export const writeProductsToJSON = (
    data: Product[],
    callback: (error: Error | void | null) => void
  ): void => {
    fs.writeFile(JSONProductsPath, JSON.stringify(data), err => {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    });
};