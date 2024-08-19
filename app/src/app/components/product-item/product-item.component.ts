import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  @Input() product:Product={} as Product

  wishedListHeart:boolean=false

  constructor(private _cartService:CartService ,private _wishList:WishlistService ,private _toastr:ToastrService ){}

addToCart(id:string){
this._cartService.addToCart(id).subscribe({
  next:(res)=>{
     this._cartService.numOfCartItems.next(res.numOfCartItems)
     this._toastr.success('item has been added to cart','sucess',{
      
      timeOut:2000
      
    })
    console.log(res)},
  error:(err)=>console.log(err)
  
  
})  
}

addToWishList(id:string){
  this._wishList.addToWishList(id).subscribe({
    next:(res)=>{console.log(res)
      this.wishedListHeart=true
      this._toastr.success('item has been added to wish list','sucess',{
      
        timeOut:2000
        
      })
    },
    error:(err)=>{console.log(err);
    }
  })
}


removeItem(productId:string){
  this._wishList.removeWishedItem(productId).subscribe({
    next:(res:any)=>{
      console.log(res.data)
      this.wishedListHeart=false
      
    },
    error:(err)=>{}
  })
  
}

}
