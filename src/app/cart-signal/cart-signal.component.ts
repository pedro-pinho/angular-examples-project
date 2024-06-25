import { Component, computed, signal } from '@angular/core';
import { Item } from './item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-signal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-signal.component.html',
  styleUrl: './cart-signal.component.css'
})

export class CartSignalComponent {
  newItemName: string = '';
  newItemPrice: number  | null = null;

  items: Item[] = [];
  itemList = signal<Item[]>(this.items);

  totalPrice = computed(() => this.itemList().reduce((acc, item) => acc + item.price, 0));

  addItem() {
    if (this.newItemName && this.newItemPrice) {
      const newItem = { name: this.newItemName, price: this.newItemPrice };
      this.itemList.set([...this.itemList(), newItem]);

      this.newItemName = '';
      this.newItemPrice = null;
    }
  }

  removeItem(item: Item) {
    this.itemList.set(this.itemList().filter(i => i !== item));
  }
}
