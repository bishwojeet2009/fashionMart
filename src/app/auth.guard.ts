import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './service/global.service';
import { User } from './interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user: User | null = null

  constructor(public global: GlobalService, private router: Router) {
    this.global.user$.subscribe(res => {
      this.user = res.user
    })

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.user != null ? this.user.user : 0) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }

}
