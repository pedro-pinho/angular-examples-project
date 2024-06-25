import { Component } from '@angular/core';
import { Products } from '../products';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  newProductForm: Products = {
    id: '',
    name: '',
    price: 0,
  };

  constructor(private productService: ProductService, private router: Router) { }

  createProduct() {
    this.productService.createProduct(this.newProductForm).subscribe({
      next: (product) => {
        console.log('Product created', product);
        this.router.navigate(['/crud']);
      },
      error: (error) => {
        console.error('Error creating product', error);
      }
    });
  }
}
