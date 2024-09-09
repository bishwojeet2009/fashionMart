import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { User, UserState } from '../interface/user';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  windowWidth = window.innerWidth;
  user$: Observable<UserState>
  user: any = {}

  constructor(private cookieService: CookieService, private store: Store<{ user: UserState }>) {
    this.user$ = this.store.select('user')
    window.onresize = (e) => {
      this.windowWidth = window.innerWidth;
    };
  }

  isMobile() {
    return this.windowWidth < 767;
  }

  getCookie(name: string) {
    return this.cookieService.get(name);
  }

  deleteCookie(name: string) {
    this.cookieService.delete(name)
  }

  setCookie(name: string, value: string, expireDays: number, path: string = "") {
    this.cookieService.set(name, value, expireDays)
  }

  decodeToken(token: string): User {
    return jwtDecode(token)
  }
}
