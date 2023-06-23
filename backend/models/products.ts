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

const getProductsFromFile = (callback: (products: Product[]) => void): void => {
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
    data: Product[],
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

// export interface Product {
//     productId: string;
//     productName: string;
//     productOwnerName: string;
//     developers: string[];
//     scrumMasterName: string;
//     startDate: Date;
//     methodology: string;
// };

export class Product {
    readonly productId: string;
    private productName: string;
    private productOwnerName: string;
    private developers: string[];
    private scrumMasterName: string;
    private startDate: Date;
    private methodology: string;

    constructor(
        name: string,
        ownerName: string,
        developers: string[],
        scrumMasterName: string,
        startDate: Date,
        methodology: string
      ) {
        this.productId = uuidv4();
        this.productName = name;
        this.productOwnerName = ownerName;
        this.developers = developers;
        this.scrumMasterName = scrumMasterName;
        this.startDate = startDate;
        this.methodology = methodology;
      };

    save(): void {
        getProductsFromFile((products: Product[]) => {
            products.push(this);
            writeProductsToJSON(products, err => {
                if (err) {
                    throw new Error('Saved failed: ' + err.message);
                }
            });
        });
    };


}