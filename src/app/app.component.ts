import { Component } from '@angular/core';
import { GlobalService } from './service/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../sd-scss/globalCss.scss', './app.component.scss']
})
export class AppComponent {

  constructor(public global: GlobalService, private router: Router) {
    let token = this.global.getCookie('userToken')
    if (token) {
      this.global.user = this.global.decodeToken(token)
    }
  }

  logout() {
    this.global.deleteCookie('userToken')
    this.global.user = {}
    this.router.navigate(['/home'])
  }
}
