import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading:boolean = false;
  isNotValid:boolean = false;
  apiError:string = '';


  constructor(private _authService : AuthService , private _router : Router)
  {
    if(localStorage.getItem('userToken')!=null){
      this._router.navigate(['/home'])
    }
  }
  
  loginForm: FormGroup = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,18}$/)]),
  })

  login(form:FormGroup){
    console.log('Hi',form);
    
    if(form.valid){
      this.isLoading=true
      this._authService.login(form.value).subscribe({
        next:(data)=>{
          console.log(data);
          this.isLoading=false
          localStorage.setItem('userToken',data.token)
          this._authService.getUserData()
          this._router.navigate(['/home'])
        
        },
        error:(err)=>{console.log(err.error.message);
          this.apiError=err.error.message
          this.isLoading=false

        }
      })
    }
    else{
      this.isNotValid=true
    }
  }
}
