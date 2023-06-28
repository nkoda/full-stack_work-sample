export interface NewProduct {
  productName: string;
  productOwnerName: string;
  developers: string[];
  scrumMasterName: string;
  startDate: Date;
  methodology: string;
  location: string;
}

export interface Product extends NewProduct {
    readonly productId: string;
  }
  
  export const keyOfProducts: string[] = [
      'productName',
      'productOwnerName',
      'developers',
      'scrumMasterName',
      'startDate',
      'methodology',
      'location',
      'productId'
    ]
  
  