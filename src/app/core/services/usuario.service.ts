import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Usuario, ListaUsuario} from '../../shared/models/usuario.model';
import {ConstantesService} from '../../config/constantes.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'usuario';

   getPaginated(perPage: number, currentPage: number): Observable <ListaUsuario> {

    return this.http.get<ListaUsuario>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Usuario[]> {

    return this.http.get<Usuario[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaUsuario> {

    return this.http.get<ListaUsuario>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getAmongDates(fechaInicial, fechaFinal): Observable <Usuario[]> {

    return this.http.get<Usuario[]>(this.uri + this.url + '?fechaInicial=' + fechaInicial + '&fechaFinal=' + fechaFinal);

   }

   send(body: Usuario): Observable <Usuario> {

     return this.http.post<Usuario>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Usuario> {

    return this.http.get<Usuario>(this.uri + this.url + '/' + id);

   }

   update(body: Usuario, id: number): Observable <Usuario> {

    return this.http.put<Usuario>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Usuario> {

  return this.http.delete<Usuario>(this.uri + this.url + '/' + id );

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
