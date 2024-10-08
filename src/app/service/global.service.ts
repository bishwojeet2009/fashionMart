import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { User, UserInfoState, UserState } from '../interface/user';
import { Store } from '@ngrx/store';
import { ProductListState } from '../interface/product';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  windowWidth = window.innerWidth;
  user$: Observable<UserState>
  userInfo$: Observable<UserInfoState>
  productList$: Observable<ProductListState>

  constructor(private cookieService: CookieService, public store: Store<{ user: UserState, userInfo: UserInfoState, productList: ProductListState }>) {
    this.user$ = this.store.select('user');
    this.userInfo$ = this.store.select('userInfo');
    this.productList$ = this.store.select('productList')
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
