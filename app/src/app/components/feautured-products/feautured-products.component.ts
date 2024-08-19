import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-feautured-products',
  templateUrl: './feautured-products.component.html',
  styleUrl: './feautured-products.component.css'
})
export class FeauturedProductsComponent implements OnInit {
  allProduct:Product[]=[]
  searchKey:string=''
  
  constructor(private _productsService:ProductsService){
  
  }
  ngOnInit(): void {
    this.getAllProducts()
  }
  getAllProducts(){
    this._productsService.getProducts().subscribe({
      next:(res)=>{
        console.log(res);
        this.allProduct=res.data
      }
    })
  }
}
