import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {TokenService} from '../authentication/token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private token: TokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token.sendToken()}`
      }
    });
    return next.handle(request);
  }
}
