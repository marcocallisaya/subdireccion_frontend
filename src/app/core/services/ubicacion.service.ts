import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Ubicacion} from '../../shared/models/ubicacion.model';
import {ConstantesService} from '../../config/constantes.service';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'ubicacion';

   get(): Observable <any> {
     return this.http.get<any>(this.uri + this.url);
   }

   send(body: Ubicacion): Observable <Ubicacion> {

     return this.http.post<Ubicacion>(this.uri + this.url, body);
   }

   getOne(id: number): Observable <Ubicacion> {

    return this.http.get<Ubicacion>(this.uri + this.url + '/' + id);
   }

   update(body: Ubicacion, id: number): Observable <Ubicacion> {

    return this.http.put<Ubicacion>(this.uri + this.url + '/' + id , body);
  }

  delete(id: number): Observable <Ubicacion> {

  return this.http.delete<Ubicacion>(this.uri + this.url + '/' + id );
  }
}
