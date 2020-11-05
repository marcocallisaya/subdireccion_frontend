import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ConstantesService} from '../../config/constantes.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  baseUrl = this.urls.URL;
  token: any;
  constructor(private http: HttpClient, private urls: ConstantesService) {
   }
   postData(url, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        ['Authorization'] : 'Bearer ' + this.token
      })
    };
    return this.http.post(this.baseUrl + url, data);
    }


    getToken(token): void {
      this.token = token;
    }

    sendToken(): string {
      return localStorage.getItem('authToken');
    }


    signOut(): void {
      localStorage.removeItem('person');
      localStorage.removeItem('cuenta');
      localStorage.removeItem('authToken');
      localStorage.removeItem('permissions');
      localStorage.removeItem('sucursal');
    }
}
