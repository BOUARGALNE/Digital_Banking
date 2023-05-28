import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../../services/accounts.service";
import {Observable} from "rxjs";
import {AccountDetails, accountOperationDTOList} from "../../models/account.model";
import {Customer} from "../../models/customer.model";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css']
})
export class ManageAccountsComponent implements OnInit {
  accountFormGroup! :FormGroup ;
  operationFormGroup!:FormGroup
  currentPage :number =0;
  pageSize :number =5;
  accountObservable! :Observable<AccountDetails> ;
  constructor(private fb:FormBuilder,private accountService:AccountsService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId:this.fb.control('')
    } );
    this.operationFormGroup= this.fb.group({
      operationType:this.fb.control(null),
      amount : this.fb.control(0),
      description:this.fb.control(null),
      accountDestination :this.fb.control(null)
    });
  }

  searchAccount() {
    let id:number;
    id=this.accountFormGroup.value.accountId;
    this.accountFormGroup.setValue({accountId:id});
    let accountId : string = this.accountFormGroup.value.accountId;
    this.accountObservable=this.accountService.getAccount(accountId ,this.currentPage,this.pageSize);
  }

  gotoPage(page:number) {
    this.currentPage=page;
    this.searchAccount();
  }

  handleAccountOperation() {

    let accountId:string= this.accountFormGroup.value.accountId;
    let operationType= this.operationFormGroup.value.operationType;
    let amount= this.operationFormGroup.value.amount;
    let description= this.operationFormGroup.value.description;
    let accountDestination= this.operationFormGroup.value.accountDestination;
    console.log(accountId+" "+operationType+" "+amount+" "+description)


    if(operationType=='DEBIT'){
      this.accountService.makeDebit(accountId,amount,description).subscribe(
        {
          next: data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: "The debit operation has been successfully executed !",
              showConfirmButton: false,
              timer: 2500
            });
            this.searchAccount();
            this.accountFormGroup.reset();
          },
          error: err => {
          }
        }
      );
    }else if(operationType=='CREDIT'){
      this.accountService.makeCredit(accountId,amount,description).subscribe(
        {
          next: data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: "The credit operation has been successfully executed !",
              showConfirmButton: false,
              timer: 2500
            });
            this.searchAccount();
            this.accountFormGroup.reset();
          },
          error: err => {
          }
        }
      );
    }else if('TRANSFER'){
      this.accountService.makeTransfer(accountDestination,accountId,amount,description).subscribe(
        {
          next: data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: "The transfer operation has been successfully executed !",
              showConfirmButton: false,
              timer: 2500
            });
            this.searchAccount();
            this.accountFormGroup.reset();
          },
          error: err => {
          }
        }
      );
    }
  }
}
