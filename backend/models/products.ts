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
    }

    static fetchAll(callback: (products: Product[]) => any): void {
        getProductsFromFile(callback);
    }

    static updateProductById(
        id: string,
        attributes: Partial<Product>,
        callback: (error: Error | null) => void
    ): void {
        //get all products in JSON and modify the product list
        getProductsFromFile((products: Product[]) => {
          const updatedProducts = Product.modifyProductsById(
            id,
            products,
            attributes
          );
          // Save Products
          writeProductsToJSON(updatedProducts, (error: Error | void | null) => {
            if (error) {
              callback(error);
            } else {
              callback(null);
            }
          });
        });
      }
      

    private static modifyProductsById(
        id: string,
        products: Product[],
        attributes: Partial<Product>
    ): Product[] {
        //locate product with id
        const updateKeys = Object.keys(attributes);
        if (!updateKeys.length) {
          throw new Error('At least one attribute must be updated');
        }
        //get productIndex in the fetched data that match the product id
        const productIndex =
          products.findIndex((product: Product) => product.productId === id);
        if (productIndex === -1) {
          throw new Error('Product with ID ' + id + ' not found');
        }
        // Updating product with new attributes by combining attributes
        (products[productIndex] as Partial<Product>) = {
          ...products[productIndex]!,
          ...attributes,
        };
        return products;
    };

    static getProductById(
        id: string,
        callback: (product: Product) => void
    ): void {
        getProductsFromFile(products => {
          const product = products.find(product => product.productId == id);
          if (product) {
            callback(product);
          } else {
            throw new Error('No product with ID ' + id + ' exists.');
        }
    });
    }
      
}