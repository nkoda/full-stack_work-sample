import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../Product';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products'

  constructor(private http:HttpClient) { }

  addProduct(product: Product):Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, httpOptions);
  } 

  getProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${product.productId}`;
    return this.http.get<Product>(url);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  updateProduct(product: Product, body: any): Observable<Product> {
    const url = `${this.apiUrl}/${product.productId}`;
    return this.http.put<Product>(url, body);
  }

  deleteProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${product.productId}`;
    return this.http.delete<Product>(url);
  }
}
