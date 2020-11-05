import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Tramite} from '../../shared/models/tramite.model';
import {ConstantesService} from '../../config/constantes.service';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'tramite';

   get(): Observable <any> {
     return this.http.get<any>(this.uri + this.url);
   }

   send(body: Tramite): Observable <Tramite> {

     return this.http.post<Tramite>(this.uri + this.url, body);
   }

   getOne(id: number): Observable <Tramite> {

    return this.http.get<Tramite>(this.uri + this.url + '/' + id);
   }

   update(body: Tramite, id: number): Observable <Tramite> {

    return this.http.put<Tramite>(this.uri + this.url + '/' + id , body);
  }

  delete(id: number): Observable <Tramite> {

  return this.http.delete<Tramite>(this.uri + this.url + '/' + id );
  }
}