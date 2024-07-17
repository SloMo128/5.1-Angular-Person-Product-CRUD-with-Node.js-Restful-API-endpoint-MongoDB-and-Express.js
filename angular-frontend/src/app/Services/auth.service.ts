import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { UserLogin } from '../Models/user.login';


@Injectable({
   providedIn: 'root'
})
export class AuthService {

   baseURL: string = "http://localhost:3000/api/login/";

   constructor(private http: HttpClient) { }

   getUserLogin(userName: string, password: string): Observable<UserLogin> {
      let params = new HttpParams();

      params = params.append('userName', userName);
      params = params.append('password', password);

      return this.http.get<UserLogin>(this.baseURL, { params })
   }

   logout(): void {
      localStorage.removeItem('isUsrLoggedIn');
      localStorage.removeItem('isAdmLoggedIn');
      localStorage.removeItem('isSalLoggedIn');
   }
}
