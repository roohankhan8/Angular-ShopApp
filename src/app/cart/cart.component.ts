import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../products';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  items = this.cartService.getItems();
  product: Product | undefined;

  more_than_one_item = this.items.length > 1;
  not_empty_cart = this.items.length > 0;
  empty_cart = this.items.length <= 0;

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
  });
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  removeItem(item: Product) {
    this.cartService.removeItem(item);
    window.alert('Your product has been deleted from the cart!');
  }
  delAll() {
    this.cartService.delAll();
    window.alert('All your products have been deleted from the cart!');
    location.reload();
  }
  onSubmit(): void {
    // Process checkout data here
    this.items = this.cartService.clearCart();
    this.cartService.delAll();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
    location.reload();
  }
}
