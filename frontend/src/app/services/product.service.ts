import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewProduct, Product } from '../Product';

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

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  addProduct(product: NewProduct):Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, httpOptions);
  } 

  getProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${product.productId}`;
    return this.http.get<Product>(url);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
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
