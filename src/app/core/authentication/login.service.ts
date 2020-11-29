import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {ConstantesService} from '../../config/constantes.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private urls: ConstantesService) { }

  uri = this.urls.URL;

  login(body): Observable <any> {

    return this.http.post<any>(this.uri + 'login', body);

  }

  logout(id): Observable <any> {

    return this.http.get<any>(this.uri + 'logout/' + id);

  }

  getUsuario(): any {
    return JSON.parse(localStorage.getItem('usuario'));
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('authToken'));
  }

  getDatosPersonales(): string {
    return JSON.parse(localStorage.getItem('datos'));
  }
}
