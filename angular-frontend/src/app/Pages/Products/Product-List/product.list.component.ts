import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { FeedBack } from 'src/app/Models/feedback';
import { ProductApiService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.moddel';

@Component({
    selector: 'app-root-product-list',
    templateUrl: './product.list.component.html',
})
export class ProductListComponent implements OnInit {

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

        localStorage.removeItem('productId');

        this.feedback = { feedbackType: '', feedbackmsg: '' };
        this.productsForm = this.fb.group({
            search: [''],
        })

        this.data = localStorage.getItem('personId');
        if (!this.data) {
            alert("Something wrong!");
            this.router.navigate(['']);
            return;
        }

        this.getPersonProduct(this.data);

        let storeDataAdm = localStorage.getItem("isAdmLoggedIn");
        let storeDataSal = localStorage.getItem("isSalLoggedIn");
        let storeDataUsr = localStorage.getItem("isUsrLoggedIn");

        if (storeDataUsr != null && storeDataUsr == "true" || storeDataAdm != null && storeDataAdm == "true") {
            this.isLoggedIn = false;
        } else if (storeDataSal != null && storeDataSal == "true") {
            this.isLoggedIn = true;
        }
    }

    getPersonProduct(person_id: string): void {
        this.products = [];
        this.productService.getPersonProduct(person_id).subscribe({
            next: (data: Product[]) => {
                if (data.length !== 0) {
                    this.products = data;
                }
            },
            error: (err: any) => {
                if (err.feedbackType === 404 || err.feedbackType === 'error') {
                    this.isLoadingProduct = false;
                    this.isLoading = true;
                } else {
                    this.isLoadingProduct = false;
                    this.isLoading = false;
                    this.feedback = {
                        feedbackType: err.feedbackType,
                        feedbackmsg: err.feedbackmsg,
                    };
                }
            },
            complete: () => {
                this.isLoadingProduct = true;
                this.feedback = { feedbackType: 'success', feedbackmsg: 'loaded' };
            },
        });
    }

    deleteProduct(id: string, index) {

        if (window.confirm("Are you sure you want to delete this product?")) {
            this.productService.deleteProduct(id).subscribe({
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
            });
        }
    }

    saveDataAndNavigate(id: string) {
        localStorage.setItem('productId', id);
        this.router.navigate(['/productedit/']);
    }
}