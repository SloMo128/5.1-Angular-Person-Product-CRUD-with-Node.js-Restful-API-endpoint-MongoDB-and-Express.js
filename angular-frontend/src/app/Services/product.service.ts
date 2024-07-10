import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../Models/product.moddel';

@Injectable()
export class ProductApiService {

    baseURL: string = "http://localhost:3000/api/product/";

    constructor(private http: HttpClient) { }

    findByQueryOneSearch(params: HttpParams ): Observable<Product[]> {
        //let params = new HttpParams();
        /*Object.keys(queryObj).forEach(key => {
            params = params.append(key, queryObj[key]);
        });*/
        //params = params.append('search', queryObj);
        return this.http.get<Product[]>(this.baseURL + 'filter/', {params});
    }

    getProducts(id: string): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseURL + 'person/' + id)
        //.pipe(catchError((err) => this.handleError('GetProduct', err)));
    }

    getPersonProduct(id: string): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseURL + id)
        //.pipe(catchError((err) => this.handleError('GetProduct', err)));
    }

    deleteProduct(id: string): Observable<Product> {
        return this.http.delete<Product>(this.baseURL + 'deleteproduct/' + id)
        //.pipe(catchError((err) => this.handleError('DELETE', err)));
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(this.baseURL + id)
        //.pipe(catchError((err) => this.handleError('GET', err)));
    }

    updateProduct(id: string, product: Product): Observable<Product> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(product);
        return this.http.put<Product>(this.baseURL + "updateproduct/" + id, body, { 'headers': headers })
        //.pipe(catchError((err) => this.handleError('PUT', err)));
    }

    addProduct(peoduct: Product): Observable<Product> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(peoduct);
        console.log(body)
        return this.http.post<Product>(this.baseURL + 'addproduct', body, { 'headers': headers })
        //.pipe(catchError((err) => this.handleError('POST', err)));
    }
}