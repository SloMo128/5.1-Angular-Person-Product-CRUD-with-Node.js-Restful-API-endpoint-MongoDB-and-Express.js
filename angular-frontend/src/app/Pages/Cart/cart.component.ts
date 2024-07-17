import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { FeedBack } from 'src/app/Models/feedback';
import { ProductApiService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.moddel';
import { PersonProduct } from 'src/app/Models/person.products.model';

@Component({
    selector: 'cart-product-add',
    templateUrl: './cart.component.html',
})
export class CartAddComponent{

}
