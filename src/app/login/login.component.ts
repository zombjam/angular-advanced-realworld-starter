import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UserLoginInfo } from '../interfaces/login-info';
import { LoginService } from '../login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: UserLoginInfo = {
    email: '',
    password: '',
  };

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login(form: NgForm) {
    if (form.valid) {
      this.loginService
        .login(form.value as UserLoginInfo)
        .pipe(map((response) => response.user))
        .subscribe((info) => {
          localStorage.setItem('token', info.token);
          this.router.navigate(['/']);
        });
    }
  }

  isInvalid(form: NgForm, ctrl?: NgModel | null) {
    return ctrl?.invalid && (ctrl?.touched || form.submitted);
  }
}
