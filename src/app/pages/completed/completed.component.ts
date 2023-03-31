import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent {
  transactionId: any;
  constructor(private route: ActivatedRoute) { }



  ngOnInit(){
    this.route.queryParams.subscribe(params => {this.transactionId = params})
  }
}
