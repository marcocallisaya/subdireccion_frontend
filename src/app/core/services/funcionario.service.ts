import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstantesService } from 'src/app/config/constantes.service';
import {Funcionario, ListaFuncionario} from 'src/app/shared/models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'funcionario';

   getPaginated(perPage: number, currentPage: number): Observable <ListaFuncionario> {

    return this.http.get<ListaFuncionario>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Funcionario[]> {

    return this.http.get<Funcionario[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaFuncionario> {

    return this.http.get<ListaFuncionario>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getAmongDates(fechaInicial, fechaFinal): Observable <Funcionario[]> {

    return this.http.get<Funcionario[]>(this.uri + this.url + '?fechaInicial=' + fechaInicial + '&fechaFinal=' + fechaFinal);

   }

   getAmongReferences(fechaInicial, fechaFinal, estado, cargo): Observable <Funcionario[]> {

    return this.http.get<Funcionario[]>(this.uri + this.url +
                                     '?fechaInicial=' + fechaInicial +
                                     '&fechaFinal=' + fechaFinal +
                                     '&estado=' + estado +
                                     '&cargo=' + cargo);

   }

   send(body: Funcionario): Observable <Funcionario> {

     return this.http.post<Funcionario>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Funcionario> {

    return this.http.get<Funcionario>(this.uri + this.url + '/' + id);

   }

   update(body: Funcionario, id: number): Observable <Funcionario> {

    return this.http.put<Funcionario>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Funcionario> {

  return this.http.delete<Funcionario>(this.uri + this.url + '/' + id );

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
