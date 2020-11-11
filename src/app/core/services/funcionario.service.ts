import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

   send(body: Funcionario): Observable <Funcionario> {

     return this.http.post<Funcionario>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Funcionario> {

    return this.http.get<Funcionario>(this.uri + this.url + '/' + id);

   }

   update(body: Funcionario, id: number): Observable <Funcionario> {

    return this.http.put<Funcionario>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Funcionario> {

  return this.http.delete<Funcionario>(this.uri + this.url + '/' + id );

  }
}
