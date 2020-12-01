import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {TokenService} from '../authentication/token.service';
import { LoginService } from '../authentication/login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private token: TokenService, private usuario: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.token.sendToken();
    const usuario = this.usuario.getUsuario();
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    if (usuario) {
      request = request.clone({params: request.params.set('usuario_identificador', usuario.id)});
    }
    return next.handle(request);
  }
}
