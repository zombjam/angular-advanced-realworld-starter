import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  get token() {
    return localStorage.getItem('token');
  }

  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let cloneReq = req;
    if (this.token) {
      cloneReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }
    return next.handle(cloneReq);
  }
}
