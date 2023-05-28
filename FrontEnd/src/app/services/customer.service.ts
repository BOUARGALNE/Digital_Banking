import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer, CustomerDTOS} from "../models/customer.model";
import {environment} from "../../environments/environment";
import {BankAccountDTOS} from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  public getCustomer(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(environment.apiUrl + "/customers")
  }

  public getOneCustomer(id: number): any {
    return this.http.get<any>(environment.apiUrl + "/customers/" + id);
  }

  public searchCustomers(keyword: string, page: number): Observable<CustomerDTOS> {
    return this.http.get<CustomerDTOS>(environment.apiUrl + "/customers/search?keyword=" + keyword + "&page=" + page)
  }

  public searchAccountByCustomer(page: number): Observable<BankAccountDTOS> {
    return this.http.get<BankAccountDTOS>(environment.apiUrl + "/Account/searchAccount?page=" + page)
  }

  public saveCustomer(customer: Customer): Observable<Array<Customer>> {
    return this.http.post<Array<Customer>>(environment.apiUrl + "/customers", customer);
  }

  public deleteCustomer(id: number) {
    return this.http.delete(environment.apiUrl + "/customers/" + id);
  }

  updateCustomer(customer: Customer): Observable<Array<Customer>> {
    return this.http.put<Array<Customer>>(environment.apiUrl + "/customers/" + customer.id, customer);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(environment.apiUrl + "/customers/" + id);
  }

  public getAccountsOfCustomer(id: number): any {
    return this.http.get<any>(environment.apiUrl + "/customers/" + id + "/accounts");
  }
}
