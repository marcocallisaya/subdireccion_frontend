import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ConstantesService} from '../config/constantes.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private http: HttpClient,
    private url: ConstantesService,
  ) { }

   uri = this.url.URL;

   get(url: string, tipo ): Observable <tipo> {
     return this.http.get<any>(this.uri + url);
   }

   send(url: string, body: any): Observable <any> {

     return this.http.post<any>(this.uri + url, body);
   }

   getOne(url: string, id: number): Observable <any> {

    return this.http.get<any>(this.uri + url + id);
   }

   update(url: string, body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + url + id , body);
  }

  delete(url: string, id: number): Observable <any> {

  return this.http.delete<any>(this.uri + url + id );
  }
}
