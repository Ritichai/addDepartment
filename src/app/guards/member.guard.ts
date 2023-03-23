import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthorizationService } from '../services/user-authorization.service';
@Injectable({
  providedIn: 'root'
})
export class MemberGuard {
  constructor(
    private authService: UserAuthorizationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['error-403']);
      return false;
    } else {
      return new Promise((resolve, reject) => {
        //   resolve(true);
        this.authService.checkLoggedIn().subscribe((response: any) => {
          console.log('check login ', response)
          // resolve(true);
          if (response['checking'] == 'OK') {
            resolve(true)
          } else if (response['status'] == 403) {
            localStorage.clear();
            this.router.navigate(['error-403']);
            resolve(false);
          } else {
            localStorage.clear();
            this.router.navigate(['login']);
            reject(false);
          }
        }, (err) => {
          if (err['status'] == 403) {
            localStorage.clear();
            this.router.navigate(['error-403']);
            resolve(false);
          } else {
            console.log(err);
            localStorage.clear();
            this.router.navigate(['login']);
            reject(false);
          }
        });
      });
    }
  }

}
