import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  @Input() items: Array<any> = []; 

  title = 'PaypalWebStore';
  public cart: Array<any> = this.items;

  constructor(private router: Router) {}

  redirect() {
    this.router.navigate(['/cart'], { queryParams: { profile: JSON.stringify(this.items) }});
    
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
