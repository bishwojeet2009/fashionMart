import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './service/global.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public global: GlobalService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.global.getCookie('userToken')
    if (token) {
      const req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      return next.handle(req)
    }
    return next.handle(request);
  }
}
