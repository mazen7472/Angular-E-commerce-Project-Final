import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  productId:string=''
  productDetails:Product= {} as Product

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  constructor(private _activatedRoute:ActivatedRoute ,private _productService:ProductsService , private _cartService:CartService,private _toastr:ToastrService ){

    this._activatedRoute.paramMap.subscribe((res:any)=>{
      console.log(res.params.id);
      this.productId=res.params.id
    })
  
  
    this._productService.getProductById(this.productId).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.productDetails=res.data
       
      }
  
    })
  }

  
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
}
