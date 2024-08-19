import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  allProduct:Product[]=[]
  searchTerm:string=''
  
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
