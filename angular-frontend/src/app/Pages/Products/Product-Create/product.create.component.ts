import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProductApiService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.moddel';
import { FeedBack } from 'src/app/Models/feedback';

@Component({
    templateUrl: './product.create.component.html',
})

export class ProductCreateComponent implements OnInit {

    createForm: FormGroup;
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

        this.createForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20),
            Validators.pattern("^[a-zA-Z0-9 ]+$")]],
            description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40),
            Validators.pattern("^[a-zA-Z0-9 ]+$")]],
            company: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15),
            Validators.pattern("^[a-zA-Z ]+$")]],
            price: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10),
            Validators.pattern("^[0-9]{1,10}")]],
            person:['']
        });
        
        const valuePersonId = localStorage.getItem('personId')
        if(valuePersonId){
            this.createForm.patchValue({person: valuePersonId});
        }
    }

    onSubmit() {
        this.productService.addProduct(this.createForm.value).subscribe({
            next: (data) => {
                this.feedback = { feedbackType: 'success', feedbackmsg: 'Porduct add successfully!' };
                setTimeout(() => this.router.navigate(['/personedit']), 4000);

                localStorage.removeItem('personId');
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
            complete: () => {
            },
        });
    
    }
    get title() {
        return this.createForm.get('title');
    }

    get description() {
        return this.createForm.get('description');
    }

    get price() {
        return this.createForm.get('price');
    }

    get company() {
        return this.createForm.get('company');
    }

    get person() {
        return this.createForm.get('person');
    }
}
