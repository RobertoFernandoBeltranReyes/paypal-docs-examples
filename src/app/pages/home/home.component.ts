import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CartComponent} from '../cart/cart.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'PaypalWebStore';
  public cart: Array<any> = [];

  constructor(private router: Router) {}

  products = [
    {
      name: 'Golden Skull',
      itemNumber: '15632',
      price: '3',
      url: 'https://m.media-amazon.com/images/I/615bM+loVNL._AC_SX679_.jpg'
    },
    {
      name: 'Black Jacket',
      itemNumber: '78520',
      price: '5',
      url: 'https://m.media-amazon.com/images/I/812gosMB60S._AC_SY879_.jpg'
    },
    {
      name: 'Jeans',
      itemNumber: '54256',
      price: '4',
      url: 'https://m.media-amazon.com/images/I/81i9BwPgtEL._AC_SX679_.jpg'
    }
  ];

  public addToCart(product: any){
    this.cart.push(product);

  }
  
}
