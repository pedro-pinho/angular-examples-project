import { Component, OnInit } from '@angular/core';
import { Products } from '../products';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  $productsData: Observable<Products[]> | undefined;
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.$productsData = this.productService.getProducts()
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.getProducts();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
