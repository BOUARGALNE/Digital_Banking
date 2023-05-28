import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageCustomersComponent} from "./components/manage-customers/manage-customers.component";
import {ManageAccountsComponent} from "./components/manage-accounts/manage-accounts.component";
import {AddCustomerComponent} from "./components/add-customer/add-customer.component";
import {UpdateCustomerComponent} from "./components/update-customer/update-customer.component";
import {CustomerAccountsComponent} from "./components/customer-accounts/customer-accounts.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {MainGuard} from "./guards/main-guard.service";
import {OneAccountComponent} from "./components/one-account/one-account.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "customers", component: ManageCustomersComponent,
    canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "accounts", component: ManageAccountsComponent, canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "Account/:id", component: ManageAccountsComponent, canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "add-customer", component: AddCustomerComponent, canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "update-customer/:id", component: UpdateCustomerComponent, canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "customer-accounts/:id", component: CustomerAccountsComponent, canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "one-account/:id", component: OneAccountComponent, canActivate: [MainGuard],
    canLoad: [MainGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
