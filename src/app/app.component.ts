import { Component, OnDestroy } from '@angular/core';
import { GlobalService } from './service/global.service';
import { Router } from '@angular/router';
import { addUserAction, addUserInfoAction, deteleUserAction, deteleUserInfoAction } from './store/user/user.action';
import { Store } from '@ngrx/store';
import { User, UserInfo } from './interface/user';
import { Subscription } from 'rxjs';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../sd-scss/globalCss.scss', './app.component.scss']
})
export class AppComponent implements OnDestroy {

  user: User | null = null;
  userSubscription: Subscription | undefined;

  constructor(public global: GlobalService, private router: Router, private api: ApiService, private store: Store<{ user: User, userInfo: UserInfo }>) {

    this.userSubscription = this.global.user$.subscribe(res => {
      this.user = res.user;
      console.log("User", this.user)
    })

    let token = this.global.getCookie('userToken')
    if (token) {
      // this.global.user = this.global.decodeToken(token)
      this.store.dispatch(addUserAction({ user: this.global.decodeToken(token) }))
      this.getUserInfo(this.global.decodeToken(token).sub)
    }
  }

  logout() {
    this.global.deleteCookie('userToken')
    // this.global.user = {}
    this.store.dispatch(deteleUserAction())
    this.store.dispatch(deteleUserInfoAction())
    this.router.navigate(['/home'])
  }

  getUserInfo(id: number) {
    this.api.getUser(id).subscribe(res => {
      this.store.dispatch(addUserInfoAction({ userInfo: res }))
    }, (err) => {
      console.warn(err)
    })
  }

  ngOnDestroy(): void {
    this.userSubscription ? this.userSubscription?.unsubscribe() : ''
  }
}
