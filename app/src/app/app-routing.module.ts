
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { SignupComponent } from './components/signup/signup.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"home" ,canActivate:[authGuard], component:HomeComponent},
  {path:"about" ,canActivate:[authGuard], component:AboutComponent},
  {path:"products" ,canActivate:[authGuard], component:ProductsComponent },
  {path:"wishlist" ,canActivate:[authGuard],component:WishlistComponent},
  {path:"checkout" ,canActivate:[authGuard],component:CheckoutComponent},
  {path:"categories" ,canActivate:[authGuard], component:CategoriesComponent},
  {path:"productDetails/:id", canActivate:[authGuard],component:ProductDetailsComponent},
  {path:"cart" , canActivate:[authGuard],component:CartComponent},
  {path:"brands" , canActivate:[authGuard],component:BrandsComponent},


  {path:"signup" , component:SignupComponent},
  {path:"login" , component:LoginComponent},
  {path:"forgetpassword",component:ForgetpasswordComponent},
  


  {path:"**" , component: NotfoundComponent}
]
;

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
