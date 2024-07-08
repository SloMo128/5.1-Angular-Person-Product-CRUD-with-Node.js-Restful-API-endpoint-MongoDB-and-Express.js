import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../Pages/Page-not-found/page.not.found.component';
import { HomeComponent } from '../Pages/Home/home.component';

import { PersonListComponent } from '../Pages/Persons/Person-List/person.list.component';
import { PersonEditComponent } from '../Pages/Persons/Person-Edit/person.edit.component';
import { PersonCreateComponent } from '../Pages/Persons/Person-Create/person.create.component';

import { ProductAllListComponent } from '../Pages/Products/Product-All-List/product.all.component';
import { ProductEditComponent } from '../Pages/Products/Product-Edit/product.edit.component';
import { ProductCreateComponent } from '../Pages/Products/Product-Create/product.create.component';

import { LoginComponent } from '../Authentication/login.component';
import { LogoutComponent } from '../Authentication/logout.component';
import { ProductGuard } from '../Authentication/product.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent },

  { path: 'listperson', component: PersonListComponent },
  { path: 'personedit', component: PersonEditComponent },
  { path: 'personcreate', component: PersonCreateComponent },

  { path: 'productlist', component: ProductAllListComponent },
  { path: 'productedit', component: ProductEditComponent, canActivate: [ProductGuard]},
  { path: 'productcreate', component: ProductCreateComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingPersonModule { }
