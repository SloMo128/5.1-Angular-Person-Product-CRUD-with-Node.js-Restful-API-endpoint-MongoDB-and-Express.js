import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Person } from '../Models/person.model';

@Injectable()
export class PersonApiService {

    baseURL: string = "http://localhost:3000/api/person/";

    constructor(private http: HttpClient){}

    getPeople(): Observable<Person[]> {
        return this.http.get<Person[]>(this.baseURL + 'listperson')
            //.pipe(catchError((err) => this.handleError('GET', err)));
    }

    deletePerson(id: string): Observable<Person> {
        return this.http.delete<Person>(this.baseURL + 'deleteperson/' + id)
            //.pipe(catchError((err) => this.handleError('DELETE', err)));
    }

    getPerson(id: string): Observable<Person> {
        return this.http.get<Person>(this.baseURL + id)
            //.pipe(catchError((err) => this.handleError('GET', err)));
    }

    updatePerson(id: string, person: Person): Observable<Person> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(person);
        return this.http.put<Person>(this.baseURL + "updateperson/" + id, body, { 'headers': headers })
            //.pipe(catchError((err) => this.handleError('PUT', err)));
    }

    addPerson(person: Person): Observable<Person> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(person);
        console.log(body)
        return this.http.post<Person>(this.baseURL + 'addperson', body, { 'headers': headers })
            //.pipe(catchError((err) => this.handleError('POST', err)));
    }

    /*private handleError(method: string, error: HttpErrorResponse) {
        console.log(`Cannot ${method}`);
        const errObj = {
            err: error,
            type: 'error',
            msg: '',
        };
        switch (error.status) {
            // json-server not running
            case 0:
                errObj.msg = 'Internal server error.';
                break;
            case 401:
                errObj.msg = 'unauthorized';
                break;
            case 403:
                errObj.msg = 'forbidden';
                break;
            case 404:
                errObj.msg = 'not found';
                break;
            case 500:
                errObj.msg = 'Internal server error.';
                break;
            default:
                errObj.msg = 'An error occurred.';
        }
        return throwError(errObj);
    }*/

}