import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { ApiService } from 'src/app/service/api.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../sd-scss/globalCss.scss', './dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userInfo: any = {}
  loadingUser: Boolean = false;

  user: User | null = null

  constructor(public global: GlobalService, private api: ApiService, private router: Router) {
    this.global.user$.subscribe(res => {
      this.user = res.user
    })
  }

  ngOnInit(): void {
    this.loadingUser = true
    this.api.getUser(this.user != null ? this.user.sub : 0).subscribe(res => {
      this.userInfo = res;
      this.loadingUser = false;
    }, (err) => {
      console.warn(err)
      this.loadingUser = false;
    })
  }

  deleteUser() {
    this.api.deleteUser(this.userInfo?.id).subscribe(res => {
      this.global.user = {};
      this.global.deleteCookie('userToken');
      this.router.navigate(['/home'])
    })
  }

}
