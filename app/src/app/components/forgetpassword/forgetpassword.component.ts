import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  step1:boolean=true
  step2:boolean=false
  step3:boolean=false
  email:string=''

  resetMessage:string=''

  constructor(private _authService:AuthService , private _router:Router){}

  forgetFrom:FormGroup=new FormGroup({
    email:new FormControl('')
  })

  resetCode:FormGroup=new FormGroup({
    resetCode:new FormControl('')
  })

  resetPassword:FormGroup=new FormGroup({
    newPassword:new FormControl('')
  })
  forgetPass(){
let userEmail=this.forgetFrom.value
this.email=userEmail.email
this._authService.forgetPassword(userEmail).subscribe({
  next:(res)=>{
    console.log(res);
    this.resetMessage=res.message
    this.step1=false
    this.step2=true
    
  },
  error:(err)=>{
    this.resetMessage='Invalid Email'
  }
})
  }

  codeReset(){
let resetCode=this.resetCode.value
    this._authService.resetCode(resetCode).subscribe({
      next:(res)=>{

        console.log(res);
        this.step2=false
        this.step3=true
        this.resetMessage=res.status
        
      },
      error:(err)=>{
        this.resetMessage='Wrong Code'
      }
    })

  }

  newPassword(){

let resetPassword=this.resetPassword.value
resetPassword.email=this.email
console.log(resetPassword);

    this._authService.newPassword(resetPassword).subscribe({
      next:(res)=>{
        console.log(res.token);
        
        if(res.token){
          localStorage.setItem('userToken', res.token)
          this._authService.getUserData()
          this._router.navigate(['/home'])
        }
      },
      error:(err)=>{}
    })

  }
}
