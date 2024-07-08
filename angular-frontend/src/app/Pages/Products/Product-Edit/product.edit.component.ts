import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProductApiService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.moddel';
import { FeedBack } from 'src/app/Models/feedback';

@Component({
    templateUrl: './product.edit.component.html',
})

export class ProductEditComponent implements OnInit {

    editForm: FormGroup;
    products: Product[] = []
    product = new Product("", "", "", "");
    feedback = new FeedBack("", "");
    data: string;
    isLoading: boolean = true;

    constructor(
        private productService: ProductApiService,
        private fb: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit() {

        this.feedback = { feedbackType: '', feedbackmsg: '' };

        this.data = localStorage.getItem('productId');
        if (!this.data) {
            alert("Something wrong!");
            this.router.navigate(['']);
            return;
        }

        this.editForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20),
            Validators.pattern("^[a-zA-Z0-9 ]+$")]],
            description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40),
            Validators.pattern("^[a-zA-Z0-9 ]+$")]],
            company: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15),
            Validators.pattern("^[a-zA-Z ]+$")]],
            price: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10),
            Validators.pattern("^[0-9]{1,10}")]]
        });

        this.loadForm(this.data);
    }

    loadForm(id: string) {
        this.productService.getProduct(id).subscribe({
            next: (data: Product) => {
                this.editForm.setValue({
                    title: data.title,
                    description: data.description,
                    company: data.company,
                    price: data.price
                })
            }
        })
    }

    onSubmit() {
        this.productService.updateProduct(this.data, this.editForm.value).subscribe({
            next: (data) => {
                this.feedback = { feedbackType: 'success', feedbackmsg: 'Porduct updated successfully!' };
                setTimeout(() => this.router.navigate(['/personedit']), 4000);

                localStorage.removeItem('productId');
            },
            error: (err: any) => {
                console.log(err);
                this.isLoading = false;
                this.feedback = {
                    feedbackType: err.feedbackType,
                    feedbackmsg: err.feedbackmsg,
                };
                throw new Error();
            },
            complete: () => {},
        });
    }

    get title() {
        return this.editForm.get('title');
    }

    get description() {
        return this.editForm.get('description');
    }

    get price() {
        return this.editForm.get('price');
    }

    get company() {
        return this.editForm.get('company');
    }
}
