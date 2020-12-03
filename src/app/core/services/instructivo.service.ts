import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import {Instructivo, ListaInstructivo} from '../../shared/models/instructivo.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstructivoService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'instructivo';

   getPaginated(perPage: number, currentPage: number): Observable <ListaInstructivo> {

    return this.http.get<ListaInstructivo>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Instructivo[]> {

    return this.http.get<Instructivo[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaInstructivo> {

    return this.http.get<ListaInstructivo>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getWithState(estado, funcionario): Observable <Instructivo[]> {

    return this.http.get<Instructivo[]>(this.uri + this.url + '?estado=' + estado + '&funcionario=' + funcionario);

   }

   getPublicated(estadoPublicacion): Observable <Instructivo[]> {

    return this.http.get<Instructivo[]>(this.uri + this.url + '?estadoPublicacion=' + estadoPublicacion);

   }

   send(body: Instructivo): Observable <Instructivo> {

     return this.http.post<Instructivo>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Instructivo> {

    return this.http.get<Instructivo>(this.uri + this.url + '/' + id);

   }

   update(body: Instructivo, id: number): Observable <Instructivo> {

    return this.http.put<Instructivo>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Instructivo> {

  return this.http.delete<Instructivo>(this.uri + this.url + '/' + id );

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
