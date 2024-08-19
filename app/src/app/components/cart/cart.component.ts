import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private _cartService:CartService  , private _toastr:ToastrService){}
  cartDetails:any=null

  

ngOnInit(): void {
  this._cartService.getLoggedUserCart().subscribe({
    next:(res)=>{console.log(res.data._id)
    this.cartDetails=res.data
    this._cartService.cartId=res.data._id
  

    },
    
    error:(err)=>console.log(err)
    
    
  })
}
removeCart(productId:string){
  this._cartService.removeCartItem(productId).subscribe({
    next:(res)=>{console.log(res.data)
    this.cartDetails=res.data
     this._toastr.success('item has been removed','sucess',{
      
      timeOut:2000
      
     })
    },
    error:(err)=>console.log(err),
    
  })

}
updateProductNum(productId:string ,count:number){

this._cartService.updateProductCount(productId,count).subscribe({
    next:(res)=>{console.log(res.data)
    this.cartDetails=res.data
    this._toastr.success('item has been updated','success',{
      
       timeOut:1000
      
    })
    },
    error:(err)=>console.log(err),
    
  })
}
}
