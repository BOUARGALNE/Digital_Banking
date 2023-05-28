import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../../models/customer.model";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: string;
  customer!: Customer;
  accounts: any = [];
  errorMessage: any;
  customerName: any;

  constructor(private route: ActivatedRoute, private router: Router,private customerService: CustomerService) {
    this.customerId = this.route.snapshot.params['id'];
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
    this.customerService.getAccountsOfCustomer(parseInt(this.customerId)).subscribe({
      next: (data: any) => {
        console.log(data);
        this.accounts = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });

    this.customerService.getOneCustomer(parseInt(this.customerId)).subscribe({
      next: (data: any) => {
        this.customerName = data.name + '(' + data.email + ')';
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {

  }

  viewOperations(account: any) {
    this.router.navigateByUrl("/one-account/" + account.id);
  }
}
