import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

declare var paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() cart: Array<any> = [];
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef | undefined;

  public param: Array<any> = [];
  public json: any;
  public PayPalCreateForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private routers: Router,
    private readonly builder: FormBuilder
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.json = JSON.parse(params['profile']);
      this.initForm(this.builder);
    });
    paypal.Buttons(
      { createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              reference_id: '1',
              description: 'test',
              amount: {
                currency_code: 'USD',
                value: this.purchase(this.json)
              },
              payer:{
                email_address: 'roberto@gmail.com',
                address: {
                  address_line_1: '2211 N First Street',
                  address_line_2: 'Building 17',
                  admin_area_1: 'CA',
                  admin_area_2: 'San Jose',
                  postal_code: '95131',
                  country_code: 'US'
                },
                name: {
                  given_name: 'Juanito',
                  surname: 'Escarcha',
                }
              },
            }
          ],
          redirect_urls: {
            return_url: 'https://www.google.com/',
            cancel_url: 'https://www.google.com/maps/'
          },
        })
      },
      onApprove:async (data: any, actions: any) => {
        const order = await actions.order.capture();
        this.routers.navigate(['/competed'],{ queryParams: {id: order.id}});
      },
      onCancel: (data: any, actions: any) => {
        console.log(data)
        this.routers.navigate(['/home']);
      },
      onError: (err: any) => {
        console.log(err)
      }
    })
    .render(this.paypalElement?.nativeElement);
  }

  public purchase(products: any): number{
    let values: number = 0;
    products.map((element: any) => {
      values = values + (element.price * 1);
    });
    return values;
  };

  private initForm(fb: FormBuilder): void {
    this.PayPalCreateForm = fb.group({
      name: new FormControl(null, [Validators.required, Validators.pattern(/[a-z]/i)])
    })
  }

}
