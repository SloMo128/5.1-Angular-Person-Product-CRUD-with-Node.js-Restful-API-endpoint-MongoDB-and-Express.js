import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { FeedBack } from 'src/app/Models/feedback';
import { ProductApiService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.moddel';
import { PersonProduct } from 'src/app/Models/person.products.model';

@Component({
  selector: 'app-product-add',
  templateUrl: './product.add.component.html',
})
export class ProductAddComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  feedback = new FeedBack('', '');
  isLoadingProduct = true;
  isLoading = true;
  isLoggedIn = false;
  searchForm: FormGroup;
  productsForm: FormGroup;
  list: PersonProduct[] = [];
  personId: string;

  constructor(
    private productService: ProductApiService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('productId');
    this.personId = localStorage.getItem('personId');

    this.feedback = { feedbackType: '', feedbackmsg: '' };

    this.searchForm = this.fb.group({
      search: [''],
    });

    this.productsForm = this.fb.group({
      products: this.fb.array([]),
    });

    this.filterProducts();

    const storeDataAdm = localStorage.getItem('isAdmLoggedIn');
    const storeDataSal = localStorage.getItem('isSalLoggedIn');
    const storeDataUsr = localStorage.getItem('isUserLoggedIn');

    if (
      (storeDataUsr !== null && storeDataUsr === 'true') ||
      (storeDataAdm !== null && storeDataAdm === 'true')
    ) {
      this.isLoggedIn = false;
    } else if (storeDataSal !== null && storeDataSal === 'true') {
      this.isLoggedIn = true;
    }
  }

  filterProducts(): void {
    let params = new HttpParams();

    if (this.searchForm.controls.search.value) {
      params = params.append('search', this.searchForm.controls.search.value);
    }

    this.productService.findByQueryOneSearch(params).subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.feedback = { feedbackType: 'success', feedbackmsg: 'Products filtered successfully' };
        this.initializeProductFormArray();
      },
      error: (err: any) => {
        this.feedback = {
          feedbackType: 'error',
          feedbackmsg: 'Failed to fetch products. Please try again later.',
        };
      },
    });
  }

  initializeProductFormArray(): void {
    const productFormArray = this.productsForm.get('products') as FormArray;
    this.products.forEach((product) => {
      productFormArray.push(
        this.fb.group({
          selected: false, // Initialize selected to false by default
          _id: product._id,
          title: product.title,
          description: product.description,
          company: product.company,
          price: product.price,
        })
      );
    });
  }

  addProductPerson(): void {
    const selectedProducts = this.productsForm.value.products.filter((productForm: any) => productForm.selected);

    this.list = selectedProducts.map((productForm: any) => ({
      person_id: this.personId,
      product_id: productForm._id,
    }));

    if (this.list.length === 0) {
      this.isLoading = false;
      this.feedback = { feedbackType: 'error', feedbackmsg: 'No products selected' };
      return;
    }

    this.productService.addList(this.list).subscribe({
      next: (data) => {
        this.feedback = { feedbackType: 'success', feedbackmsg: 'Products added successfully' };
        setTimeout(() => this.router.navigate(['/']), 4000); // Navigate to home page after 4 seconds
      },
      error: (err: any) => {
        this.isLoading = false;
        this.feedback = {
          feedbackType: 'error',
          feedbackmsg: 'Failed to add products. Please try again later.',
        };
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
