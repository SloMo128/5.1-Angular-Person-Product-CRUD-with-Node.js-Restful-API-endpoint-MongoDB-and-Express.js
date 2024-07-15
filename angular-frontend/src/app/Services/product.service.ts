import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../Models/product.moddel';
import { PersonProduct } from '../Models/person.products.model';

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

    searchProducts(searchTerm: string): Observable<Product[]> {
        let params = new HttpParams();
        
        // Aggiungi il termine di ricerca come parametro, se è definito
        if (searchTerm) {
          params = params.append('searchTerm', searchTerm);
        }
        // Eseguire la richiesta HTTP GET con i parametri di query
        return this.http.get<Product[]>(`${this.baseURL}/filter`, { params }) 
      }

      addList(list: PersonProduct[]): Observable<PersonProduct>{
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(list);
        return this.http.post<PersonProduct>(this.baseURL + 'addproductperson/', body, { 'headers': headers })
    }
}