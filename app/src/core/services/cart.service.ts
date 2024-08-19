import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartId:string=''

  numOfCartItems= new BehaviorSubject(0)
  
    constructor(private _httpClient:HttpClient) {
      this.getLoggedUserCart().subscribe({
        next:(res)=>{
          this.numOfCartItems.next(res.numOfCartItems)
        },
        error:(err)=>{console.log(err);
        }
      })
     }
  
    headers:any={
      token:localStorage.getItem('userToken')
    }
  
    addToCart(id:string): Observable<any>{
      return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      {productId:id},
      {headers:this.headers})
  
    }
    getLoggedUserCart(): Observable<any>{
      return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,
      
      {headers:this.headers})
  
    }
    removeCartItem(productId:string): Observable<any>{
      return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      
      {headers:this.headers})
  
    }
    updateProductCount(productId:string ,count:number): Observable<any>{
      return this._httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {count:count},
      
      {headers:this.headers})
  
    }
  
    onlinePayment(shippingAdress:any ,cartId:string){
      return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAdress:shippingAdress
      },
      
      {headers:this.headers})
    }
}
