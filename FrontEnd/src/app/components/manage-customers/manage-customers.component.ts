import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer, CustomerDTOS} from "../../models/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})
export class ManageCustomersComponent implements OnInit {

  customers!: Observable<CustomerDTOS>;
  errorMessage: string | undefined;
  searchFormGroup!: FormGroup;
  currentPage: number = 0;
  totalPage!: number;
  pageSize: number = 5;

  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {

    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    })
    this.searchCustomers();
  }

  searchCustomers() {
    let kw = this.searchFormGroup.value.keyword;
    this.customers = this.customerService.searchCustomers(kw, this.currentPage).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );

  }

  handleDeleteButton(customer: Customer) {
    Swal.fire({
      title: 'Are you sure that you want to delete this customer ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(customer.id).subscribe(
          {
            next: (resp) => {
              Swal.fire('Deleted successfully !', '', 'success')
              this.searchCustomers()
            },
            error: (err) => {
              console.log(err);
            }
          }
        );

      }
    });
  }

  handleUpdateButton(customer: Customer) {
    this.customerService.updateCustomer(customer)
    this.router.navigateByUrl("/customers")


  }

  goToUpdateCustomer(customer: Customer) {
    this.customerService.updateCustomer(customer)
    this.router.navigateByUrl("/update-customer/" + customer.id);
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("/customer-accounts/" + customer.id, {state: customer})
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.searchCustomers();
  }
}
