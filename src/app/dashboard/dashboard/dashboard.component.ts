import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User, UserInfo } from 'src/app/interface/user';
import { ApiService } from 'src/app/service/api.service';
import { GlobalService } from 'src/app/service/global.service';
import { addUserInfoAction, deteleUserAction, deteleUserInfoAction } from 'src/app/store/user/user.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../sd-scss/globalCss.scss', './dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userInfo: UserInfo | null = null;
  loadingUser: Boolean = false;
  userInfoSubscription: Subscription | undefined;

  // user: User | null = null

  constructor(public global: GlobalService, private api: ApiService, private router: Router, private store: Store<{ user: User, userInfo: UserInfo }>) {
    this.userInfoSubscription = this.global.userInfo$.subscribe(res => {
      this.userInfo = res.userInfo
    })
  }

  ngOnInit(): void {

  }

  deleteUser() {
    this.api.deleteUser(this.userInfo ? this.userInfo.id : 0).subscribe(res => {
      this.store.dispatch(deteleUserAction())
      this.store.dispatch(deteleUserInfoAction())
      // this.global.user = {};
      this.global.deleteCookie('userToken');
      this.router.navigate(['/home'])
    },
      (err) => {
        console.warn(err)
      })
  }

  ngOnDestroy(): void {
    this.userInfoSubscription ? this.userInfoSubscription.unsubscribe() : ''
  }

}
