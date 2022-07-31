import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  redirectTo = '/';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param) => {
      const redirectTo = param.get('redirect') ?? '/';
      this.redirectTo = redirectTo;
    });
  }

  login(form: NgForm) {
    if (form.valid) {
      this.loginService
        .login(form.value as UserLoginInfo)
        .pipe(map((response) => response.user))
        .subscribe((info) => {
          localStorage.setItem('token', info.token);
          this.router.navigate([this.redirectTo]);
        });
    }
  }

  isInvalid(form: NgForm, ctrl?: NgModel | null) {
    return ctrl?.invalid && (ctrl?.touched || form.submitted);
  }
}
