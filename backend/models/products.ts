import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getProductsFromFile, writeProductsToJSON } from '../utils/connect';


export class Product {
    readonly productId: string;
    private productName: string;
    private productOwnerName: string;
    private developers: string[];
    private scrumMasterName: string;
    private startDate: Date;
    private methodology: string;

    /**
     * Creates a new instance of the Product class.
     * @param {string} name - The name of the product.
     * @param {string} ownerName - The name of the product owner.
     * @param {string[]} developers - The developers working on the product.
     * @param {string} scrumMasterName - The name of the scrum master.
     * @param {Date} startDate - The start date of the product.
     * @param {string} methodology - The methodology used for the product.
     */
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

    /**
     * Saves the product to the JSON file.
     * @returns {void}
     * @throws {Error} If the save operation fails.
     */
    saveToJSON(): void {
        getProductsFromFile((products: Product[]) => {
            products.push(this);
            writeProductsToJSON(products, err => {
                if (err) {
                    throw new Error('Saved failed: ' + err.message);
                }
            });
        });
    }

    /**
     * Gets all products from the JSON file.
     * @param {GetProductsCallback} callback 
     *  - The callback function to handle the retrieved products.
     * @returns {void}
     */
    static getAllProducts(callback: (products: Product[]) => any): void {
        getProductsFromFile(callback);
    }

    /**
     * Gets a product by its ID from the JSON file.
     * @param {string} id - The ID of the product to retrieve.
     * @param {function} callback 
     *  - The callback function to handle the retrieved product.
     * @returns {void}
     * @throws {Error} If no product with the specified ID exists.
     */
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

    /**
     * Updates a product by its ID in the JSON file.
     * @param {string} id - The ID of the product to update.
     * @param {Record<string, any>} attributes - The attributes to update.
     * @param {function} callback 
     *  - The callback function to handle the result of the update operation.
     * @returns {void}
     * @throws {Error} 
     *  If no attribute is provided for update or if the product with the 
     *  specified ID is not found.
     */
    static updateProductById(
        id: string,
        attributes: Record<string, any>,
        callback: (error: Error | null) => void
    ): void {
        // Get all products in JSON and modify the product list
        getProductsFromFile((products: Product[]) => {
          const updatedProducts = Product.modifyProductsById(
            id,
            products,
            attributes
          );
          // Save Products to JSON file
          writeProductsToJSON(
            updatedProducts, 
            (error: Error | void | null) => {
            if (error) {
              callback(error);
            } else {
              callback(null);
            }
          });
        });
    }
    
    /**
     * Modifies the products by ID with the provided attributes.
     * @param {string} id - The ID of the product to modify.
     * @param {Product[]} products - The array of products.
     * @param {Partial<Product>} attributes - The attributes to update.
     * @returns {Product[]} The updated array of products.
     * @throws {Error} 
     *  If no attribute is provided for update or if the product with the 
     *  specified ID is not found.
     */
    private static modifyProductsById(
        id: string,
        products: Product[],
        attributes: Partial<Product>
    ): Product[] {
        // Locate product with id
        const updateKeys = Object.keys(attributes);
        if (!updateKeys.length) {
          throw new Error('At least one attribute must be updated');
        }
        // Get productIndex in the fetched data that match the product id
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
    }

    /**
     * Deletes a product by its ID from the JSON file.
     * @param {string} id - The ID of the product to delete.
     * @param {function} callback 
     *  - The callback function to handle the result of the delete operation.
     * @returns {void}
     */
    static deleteProductById(
        id: string, 
        callback: (error: Error | null) => void) {
        getProductsFromFile(products => {
            const updatedProducts = 
                products.filter(product => product.productId !== id);
            writeProductsToJSON(updatedProducts, callback);
        });
    }
}