import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
declare const $: any;
/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(
  ) {
  
   }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('usertoken');
    const headersConfig :any= {
       'Content-Type': 'application/json',
      Accept: 'application/json',
      // Authorization: `Basic ZWVraG9lMjplZWtob2UyQDEyMw==`,
     Authorization : idToken ? (`Bearer ${idToken}`) : '',
    };

   

    headersConfig['Authorization'] = idToken;
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        // Authorization: `Basic dGllU2Fsb246I0B7dH1pL2UvfClTJSYo`,
        Authorization: idToken ? (`Bearer ${idToken}`) : '',
      }
    });
    return next.handle(request);
  }
}
