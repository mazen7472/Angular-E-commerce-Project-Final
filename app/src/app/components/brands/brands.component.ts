import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  allBrands:any=null

  constructor(private _productsService:ProductsService){}

ngOnInit(): void {
 this.getBrands()
}
  

getBrands(){
  this._productsService.getBrands().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.allBrands=res.data
    },
    error:(res)=>{}
  })
}
}
