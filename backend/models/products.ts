import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Path to products data file
export const JSONProductsPath = path.join(
    path.dirname(
        require.main!.filename),
        'data',
        'products.json'
    );

const getProductsFromFile = (callback: (products: any[]) => void): void => {
    fs.readFile(JSONProductsPath, (err: any, fileContent: Buffer) => {
        if (err) {
            callback([]);
        } else {
            const contentString: string = fileContent.toString();
            callback(JSON.parse(contentString));
        }
    });
};

const writeProductsToJSON = (
    data: Product,
    callback: (error: Error | void) => void
  ): void => {
    fs.writeFile(JSONProductsPath, JSON.stringify(data), err => {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    });
};

export interface Product {
    productId: uuidv4;
    productName: string;
    productOwnerName: string;
    developers: string[];
    scrumMasterName: string;
    startDate: Date;
    methodology: string;
};