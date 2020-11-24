import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstantesService } from '../../config/constantes.service';
import {Rol, ListaRol} from '../../shared/models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'rol';

   getPaginated(perPage: number, currentPage: number): Observable <ListaRol> {

    return this.http.get<ListaRol>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Rol[]> {

    return this.http.get<Rol[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaRol> {

    return this.http.get<ListaRol>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getWithState(estado): Observable <Rol[]> {

    return this.http.get<Rol[]>(this.uri + this.url + '?estado=' + estado);

   }

   send(body: Rol): Observable <Rol> {

     return this.http.post<Rol>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Rol> {

    return this.http.get<Rol>(this.uri + this.url + '/' + id);

   }

   update(body: Rol, id: number): Observable <Rol> {

    return this.http.put<Rol>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Rol> {

  return this.http.delete<Rol>(this.uri + this.url + '/' + id );

  }

  generateReportPdf( body): any {
    return this.http.post(this.uri + this.url + '/reporte' , body , {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/pdf'
      },
      responseType: 'blob', observe: 'response'
    }).pipe(
      map((res: any) => {
        return new Blob([res.body], { type: 'application/pdf' });
      })
    );
  }
}
