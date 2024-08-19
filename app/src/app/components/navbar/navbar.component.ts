import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn: boolean = false;
  cartNum:number=0
  
  constructor(private _authService:AuthService , private _cartService: CartService){

    this._authService.userData.subscribe(()=>{
      if(this._authService.userData.getValue()){
        this.isLoggedIn=true
      }else{
        this.isLoggedIn=false
      }
    })

    _cartService.numOfCartItems.subscribe({
      next:(res)=>{
    this.cartNum=res
      },
      error:()=>{}
    })

}

logout(){
  this._authService.logout()
}
}
