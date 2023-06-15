import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './products'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  removeItem(item: Product){
    let a=this.items.indexOf(item)
    this.items.splice(a, 1)
  }

  delAll(){
    let a=this.items.length
    this.items.splice(0, a)
  }

  clearCart(){
    this.items=[]
    return this.items
  }

  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }

  constructor(private http: HttpClient) { }
}
