import { Injectable } from '@angular/core';
import { Products } from '../products/products';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url: string = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Products[]>(this.url);
  }

  getProductById(id: string) {
    return this.http.get<Products>(`${this.url}/${id}`);
  }

  createProduct(product: Products) {
    return this.getProducts().pipe(
      mergeMap((products) => {
        const maxId = products.reduce((prev, current) =>
          parseInt(prev.id) > parseInt(current.id) ? prev : current
        );
        product.id = (parseInt(maxId.id) + 1).toString();
        return this.http.post<Products>(this.url, product);
      })
    );
  }

  updateProduct(product: Products) {
    return this.http.put<Products>(`${this.url}/${product.id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete<Products>(`${this.url}/${id}`);
  }
}
