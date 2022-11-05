import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenService {
  private _islogin=new BehaviorSubject<boolean>(false);
  islogin= this._islogin.asObservable()
  constructor(private http:HttpClient,private router:Router,private router1:Router)
   {
    const token= localStorage.getItem('usertoken')
    this._islogin.next(!!token)
   }
   login(username:string,password:string)
   {
 
   this.http.post("http://localhost:61537/Users/authenticate",
  {"UserName":username,"Password":password},{headers:new HttpHeaders({'Content-Type':'Application/Json'})})
  .toPromise().then((res:any)=>{
    if (typeof(res.jwtToken) != "undefined"){
      localStorage.setItem('usertoken',res.jwtToken)
      this._islogin.next(true)
       this.router.navigateByUrl("en-us/dashboard")
      }

  })  
   }
logout()
{
window.localStorage.removeItem('usertoken');
this._islogin.next(true);
window.location.reload();
};
   
}
