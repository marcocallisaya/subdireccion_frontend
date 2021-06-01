import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstantesService } from 'src/app/config/constantes.service';
import {Evaluacion, ListaEvaluacion} from 'src/app/shared/models/evaluacion.model';
import { LoginService } from '../authentication/login.service';
import { TokenService } from '../authentication/token.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
    private token: LoginService
  ) { }

   uri = this.urls.URL;
   url = 'evaluacion';
    // verificar si es un tecnico o el superadmin
    // enviar el id del tecnico
   getPaginated(perPage: number, currentPage: number): Observable <ListaEvaluacion> {
    const funcionario_id = this.token.getUsuario().funcionario_id;
    return this.http.get<ListaEvaluacion>(this.uri + this.url + '?per_page='
       + perPage + '&page=' + currentPage + '&funcionarioId=' + funcionario_id);

   }

   get(): Observable <Evaluacion[]> {

    return this.http.get<Evaluacion[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaEvaluacion> {
    const funcionario_id = this.token.getUsuario().funcionario_id;
    return this.http.get<ListaEvaluacion>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre +
                                               '&funcionarioId=' + funcionario_id);

   }

   getWithState(estado, fechaInicial, fechaFinal): Observable <Evaluacion[]> {
    const funcionario_id = this.token.getUsuario().funcionario_id;
    return this.http.get<Evaluacion[]>(this.uri + this.url + '?estado=' +
      estado + '&fechaInicial=' + fechaInicial + '&fechaFinal=' + fechaFinal + '&funcionarioId=' + funcionario_id) ;

   }

   send(body: Evaluacion): Observable <Evaluacion> {

     return this.http.post<Evaluacion>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Evaluacion> {

    return this.http.get<Evaluacion>(this.uri + this.url + '/' + id);

   }

   update(body: Evaluacion, id: number): Observable <Evaluacion> {

    return this.http.put<Evaluacion>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Evaluacion> {

  return this.http.delete<Evaluacion>(this.uri + this.url + '/' + id );

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
