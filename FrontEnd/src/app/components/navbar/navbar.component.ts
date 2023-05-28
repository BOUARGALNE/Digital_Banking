import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  roles!: string | null;
  customerId: any;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.roles = localStorage.getItem("ROLES");
    if (localStorage.getItem("id") != undefined) {
      this.customerId = localStorage.getItem("id");
    }
  }

  logout() {
    this.auth.logout();
    //document.location.reload();
    this.roles = null;
    this.router.navigateByUrl("/login");
  }
}
