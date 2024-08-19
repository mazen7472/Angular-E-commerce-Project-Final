import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  isLoading:boolean = false;
  isNotValid:boolean = false;
  apiError:string = '';


  constructor(private _authService : AuthService , private _router : Router){}
  
  registerForm: FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,18}$/)]),
    rePassword:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,18}$/)]),
    phone:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(13)])
  })

  register(form:FormGroup){
    console.log('Hi',form);
    
    if(form.valid){
      this.isLoading=true
      this._authService.register(form.value).subscribe({
        next:(data)=>{
          console.log(data);
          this.isLoading=false
          this._router.navigate(['/login'])
        
        },
        error:(err)=>{console.log(err.error.message);
          this.apiError=err.error.message
          this.isLoading=false

        }
      })
    }else{
      this.isNotValid=true
    }
  }
}
