import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.loginService
      .login({
        email: 'demo@miniasp.com',
        password: '123456',
      })
      .pipe(map((response) => response.user))
      .subscribe((info) => {
        localStorage.setItem('token', info.token);
        this.router.navigate(['/']);
      });
  }
}
