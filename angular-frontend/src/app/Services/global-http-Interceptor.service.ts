import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { FeedBack } from '../Models/feedback';
import { Router } from '@angular/router';
import { ErrorCodeService } from './http.error.service'; 
import { HttpError } from '../Models/http.error.model';

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {

  private isHandlingError = false; // Variabile per tracciare lo stato degli errori

  constructor(private router: Router, private errorService: ErrorCodeService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);

        let feedback: FeedBack = {
          feedbackType: 'error',
          feedbackmsg: 'An error occurred.' // Messaggio di default
        };

        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            // Gestione degli errori di ErrorEvent (errori di rete lato client)
            feedback.feedbackmsg = `Client-side error: ${error.error.message}`;
            return throwError(feedback);
          } else if (error.status === 0) {
            // Gestione degli errori di rete
            feedback.feedbackmsg = 'Network error: Please check your internet connection.';
            return throwError(feedback);
          } else {
            if (this.isHandlingError) {
              // Se stiamo già gestendo un errore, non facciamo ulteriori richieste
              feedback.feedbackmsg = 'Multiple errors detected. Please try again later.';
              return throwError(feedback);
            }

            this.isHandlingError = true; // Imposta lo stato di gestione dell'errore

            return this.errorService.getHttpError(error.status).pipe(
              switchMap((errorMessage: HttpError) => {
                feedback.feedbackmsg = errorMessage[0].message;
                feedback.feedbackType = errorMessage[0].code;

                if (error.status === 401 || error.status === 403) {
                  this.router.navigateByUrl("/login");
                }

                this.isHandlingError = false; // Reimposta lo stato di gestione dell'errore
                return throwError(feedback);
              }),
              catchError(() => {
                this.isHandlingError = false; // Reimposta lo stato di gestione dell'errore
                return throwError(feedback);
              })
            );
          }
        } else {
          // Gestione di altri tipi di errori
          feedback.feedbackmsg = error || 'An unexpected error occurred.';
          return throwError(feedback);
        }
      })
    );
  }
}
