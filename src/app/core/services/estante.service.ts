import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import { Estante, ListaEstante } from 'src/app/shared/models/estante.model';
import { map } from 'rxjs/operators';
import { Ubicacion } from 'src/app/shared/models/ubicacion.model';

@Injectable({
  providedIn: 'root'
})
export class EstanteService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'estante';

   getPaginated(perPage: number, currentPage: number): Observable <ListaEstante> {

    return this.http.get<ListaEstante>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Estante[]> {

    return this.http.get<Estante[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaEstante> {

    return this.http.get<ListaEstante>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getWithState(estado): Observable <Estante[]> {

    return this.http.get<Estante[]>(this.uri + this.url + '?estado=' + estado);

   }

   getUbicaciones(id: number): Observable <Ubicacion[]> {

    return this.http.get<Ubicacion[]>(this.uri + this.url + '/' + id + '/ubicaciones');

   }

   send(body: Estante): Observable <Estante> {

     return this.http.post<Estante>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Estante> {

    return this.http.get<Estante>(this.uri + this.url + '/' + id);

   }

   update(body: Estante, id: number): Observable <Estante> {

    return this.http.put<Estante>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Estante> {

  return this.http.delete<Estante>(this.uri + this.url + '/' + id );

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
