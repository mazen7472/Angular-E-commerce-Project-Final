import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:BehaviorSubject<any>=new BehaviorSubject('')
  
  constructor(private _http:HttpClient, private _router:Router) {
    if(localStorage.getItem('userToken')){
      this.getUserData()
    }
   }

   getUserData(){
    let encodedToken=JSON.stringify(localStorage.getItem('userToken'))
    let encoded=jwtDecode(encodedToken)
    console.log(encoded);

    this.userData.next(encoded)
  }

  register(data:any) :Observable<any>{
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data)

  }

  login(data:any):Observable<any>{
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data)
  }
  


  logout(){
    localStorage.removeItem('userToken')
    this.userData.next(null)
    this._router.navigate(['/login'])
  }

  forgetPassword(userEmail:object):Observable <any>{
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',userEmail)
      }
    
      resetCode(resetCode:object):Observable<any>{
        return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',resetCode)
      }
    
      newPassword(pass:object):Observable<any>{
        return this._http.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',pass)
      }
}
