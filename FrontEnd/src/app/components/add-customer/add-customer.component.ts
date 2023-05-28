import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../models/customer.model";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  newCustomerFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private serviceCustomer: CustomerService, private router: Router) {
  }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email: this.fb.control(null, [Validators.email]),

    })
  }

  addCustomer() {
    let customer: Customer = this.newCustomerFormGroup.value;
    return this.serviceCustomer.saveCustomer(customer).subscribe(
      {
        next: data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "The customer has been successfully saved !",
            showConfirmButton: false,
            timer: 1500
          });
          this.newCustomerFormGroup.reset();
        },
        error: err => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: err.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );
  }
}
