import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../Pages/Page-not-found/page.not.found.component';
import { HomeComponent } from '../Pages/Home/home.component';
import { ProductEditComponent } from '../Pages/Products/Product-Edit/product.edit.component';
import { ProductCreateComponent } from '../Pages/Products/Product-Create/product.create.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product-edit', component: ProductEditComponent },
  //{ path: 'product-create', component: ProductCreateComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingProductModule { }