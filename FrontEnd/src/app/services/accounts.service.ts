import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails, BankAccountDTO} from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) { }
  getAccount(accountId:string,page:number,size:number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.apiUrl+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
  makeDebit(accountId:string, amount:number, description:string){
    let data1 = {accountId:accountId, amount:amount,description:description}
    return this.http.post(environment.apiUrl+"/accounts/debit", data1);
  }

  makeCredit(accountId:string, amount:number, description:string){
    let data1 = {accountId:accountId, amount:amount,description:description}
    return this.http.post(environment.apiUrl+"/accounts/credit", data1);
  }

  makeTransfer(accountDestination:string, accountSource:string, amount:number, description:string){
    let data1 = {accountSource, accountDestination,amount,description:description}
    return this.http.post(environment.apiUrl+"/accounts/transfer", data1);
  }

  updateAccount(bankAccount: BankAccountDTO):Observable<any> {
    return this.http.put<any>(environment.apiUrl+"/accounts/"+bankAccount.id,bankAccount);
  }
}
