import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstantesService } from 'src/app/config/constantes.service';
import { ListaTipoTramite, TipoTramite } from '../../shared/models/tipo_tramite.model';

@Injectable({
  providedIn: 'root'
})
export class TipoTramiteService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'tipo_tramite';

   getPaginated(perPage: number, currentPage: number): Observable <ListaTipoTramite> {

    return this.http.get<ListaTipoTramite>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <TipoTramite[]> {

    return this.http.get<TipoTramite[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaTipoTramite> {

    return this.http.get<ListaTipoTramite>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getWithState(estado): Observable <TipoTramite[]> {

    return this.http.get<TipoTramite[]>(this.uri + this.url + '?estado=' + estado);

   }

   send(body: TipoTramite): Observable <TipoTramite> {

     return this.http.post<TipoTramite>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <TipoTramite> {

    return this.http.get<TipoTramite>(this.uri + this.url + '/' + id);

   }

   update(body: TipoTramite, id: number): Observable <TipoTramite> {

    return this.http.put<TipoTramite>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <TipoTramite> {

  return this.http.delete<TipoTramite>(this.uri + this.url + '/' + id );

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
