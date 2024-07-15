import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingPersonModule } from './Routing/app-routing.person.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingProductModule } from './Routing/app-routing.product.module';

import { PageNotFoundComponent } from './Pages/Page-not-found/page.not.found.component';
import { HomeComponent } from './Pages/Home/home.component';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';

import { PersonApiService } from './Services/person.service';
import { PersonListComponent } from './Pages/Persons/Person-List/person.list.component';
import { PersonEditComponent } from './Pages/Persons/Person-Edit/person.edit.component';
import { PersonCreateComponent } from './Pages/Persons/Person-Create/person.create.component';

import { ProductApiService } from './Services/product.service';
import { ProductAllListComponent } from './Pages/Products/Product-All-List/product.all.component';
import { ProductListComponent } from './Pages/Products/Product-List/product.list.component';
import { ProductEditComponent } from './Pages/Products/Product-Edit/product.edit.component';
import { ProductCreateComponent } from './Pages/Products/Product-Create/product.create.component';
import { ProductAddComponent } from './Pages/Products/Product-Add/product.add.component';

import { GlobalErrorHandlerService } from './Services/global-error-handler.service';
import { GlobalHttpInterceptorService } from './Services/global-http-Interceptor.service';

import { LoginComponent } from './Authentication/login.component';
import { LogoutComponent } from './Authentication/logout.component';

import { ErrorCodeService } from './Services/http.error.service';
import { AuthService } from './Services/auth.service';


@NgModule({//DIRETTIVA
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    PersonListComponent,
    PersonEditComponent,
    PersonCreateComponent,
    ProductAllListComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductCreateComponent,
    ProductAddComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingPersonModule,
    AppRoutingProductModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    PersonApiService,
    ProductApiService,
    ErrorCodeService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true }
    //{ provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
