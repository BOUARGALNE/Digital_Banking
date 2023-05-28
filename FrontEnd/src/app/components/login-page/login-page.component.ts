import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {

    this.authService.login(
      {
        username: this.f['username'].value,
        password: this.f['password'].value
      }
    )
      .subscribe(success => {
        if (success) {
          if (localStorage.getItem("ROLES")!.includes("ADMIN")) {
            this.router.navigate(['/customers']);
            document.location.reload();
          } else {
            this.router.navigate(['/customer-accounts/' + localStorage.getItem("id")!]);
            setTimeout(function () {
              document.location.reload();
            }, 1000);
          }

        }
      });
  }

}
