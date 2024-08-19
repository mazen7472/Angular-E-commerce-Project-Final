import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _httpClient:HttpClient) { }

  headers:any={
    token:localStorage.getItem('userToken')
  }


addToWishList(productId:string){
  return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist',
  {productId:productId},
  {headers:this.headers})
}

getLoggedWishList(){
  return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist',

  {headers:this.headers})
}
removeWishedItem(productId:string){
  return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,

  {headers:this.headers})
}

}
