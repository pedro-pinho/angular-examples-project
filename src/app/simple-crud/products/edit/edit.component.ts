import { Component, OnInit } from '@angular/core';
import { Products } from '../products';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  productForm: Products = {
    id: '',
    name: '',
    price: 0,
  };

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.getProductById(params.get('id'));
    });
  }

  getProductById(id: string | null) {
    if (!id) {
      return;
    }
    this.productService.getProductById(id).subscribe((product) => {
      this.productForm = product;
    });
  }

  editProduct() {
    this.productService.updateProduct(this.productForm).subscribe({
      next: () => {
        this.router.navigate(['/crud']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
