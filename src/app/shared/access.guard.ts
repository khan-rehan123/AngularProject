import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request.service';

import { UserAuthenService } from './user-authen.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(private HttpService: HttpRequestService,private auth:UserAuthenService,private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.HttpService.isLoggednIn()){
       // this.myRoute.navigate(["/dashboard"]);
        return true;
      }else{
        this.router.navigate(["auth/login"]);
        return false;
      }  
  }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return this.auth.islogin.pipe(tap((login)=>{if(!login){this.router.navigate(['login'])}
    
    
  //   }));
  // }
  
}
