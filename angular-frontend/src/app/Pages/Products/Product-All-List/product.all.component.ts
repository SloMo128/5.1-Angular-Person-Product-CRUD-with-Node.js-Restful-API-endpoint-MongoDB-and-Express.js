import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { FeedBack } from 'src/app/Models/feedback';
import { ProductApiService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.moddel';

@Component({
    selector: '',
    templateUrl: './product.all.component.html',
})
export class ProductAllListComponent implements OnInit {

    products: Product[] = [];
    filteredProducts: Product[] = [];
    feedback = new FeedBack("", "");
    isLoadingProduct: boolean = true;
    isLoading: boolean = true;
    data: string;
    isLoggedIn: boolean = false;
    productsForm: FormGroup;

    constructor(
        private productService: ProductApiService,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.feedback = { feedbackType: '', feedbackmsg: '' };
        this.productsForm = this.fb.group({
            search: [''],
        })

        let storeDataAdm = localStorage.getItem("isAdmLoggedIn");
        let storeDataSal = localStorage.getItem("isSalLoggedIn");
        let storeDataUsr = localStorage.getItem("isUserLoggedIn");

        if (storeDataUsr != null && storeDataUsr == "true" || storeDataAdm != null && storeDataAdm == "true") {
            this.isLoggedIn = false;
        } else if (storeDataSal != null && storeDataSal == "true") {
            this.isLoggedIn = true;
        }
    }

    filterProducts() {
        // Retrieve the search value from the form control
        let params = new HttpParams();

        if (this.productsForm.controls.search.value) {
            params = params.append('search', this.productsForm.controls.search.value);
        }
        
        // Send the filtered products to the backend for further processing or storing
        this.productService.findByQueryOneSearch(params).subscribe({
            next: (data: Product[]) => {
                // Update the products with the data received from the server
                this.products = data;
                // Provide feedback to the user
                this.feedback = { feedbackType: 'success', feedbackmsg: 'filtered' };
            },
            error: (err: any) => {
                // Handle any errors from the server
                this.feedback = {
                    feedbackType: err.type,
                    feedbackmsg: err.msg,
                };
            }
        });
    }
    
    deleteProduct(id: string, index) {
        if (window.confirm("Are you sure you want to delete this product?")) {
            /*this.productService.deleteProduct(id).subscribe({
                next: (data) => {
                    this.products.splice(index, 1);
                },
                error: (err: any) => {
                    this.isLoadingProduct = false;
                    console.log(err);
                    this.feedback = {
                        feedbackType: err.feedbackType,
                        feedbackmsg: err.feedbackmsg,
                    };
                    throw new Error();
                }
            });*/
        }
    }

    saveDataAndNavigate(id: string) {
        localStorage.setItem('productId', id);
        this.router.navigate(['/productedit/']);
    }
}