import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import { Carrera, ListaCarrera } from 'src/app/shared/models/carrera.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'carrera';

   getPaginated(perPage: number, currentPage: number): Observable <ListaCarrera> {

    return this.http.get<ListaCarrera>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Carrera[]> {

    return this.http.get<Carrera[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaCarrera> {

    return this.http.get<ListaCarrera>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getAmongDates(fechaInicial, fechaFinal): Observable <Carrera[]> {

    return this.http.get<Carrera[]>(this.uri + this.url + '?fechaInicial=' + fechaInicial + '&fechaFinal=' + fechaFinal);

   }

   send(body: Carrera): Observable <Carrera> {

     return this.http.post<Carrera>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Carrera> {

    return this.http.get<Carrera>(this.uri + this.url + '/' + id);

   }

   update(body: Carrera, id: number): Observable <Carrera> {

    return this.http.put<Carrera>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Carrera> {

  return this.http.delete<Carrera>(this.uri + this.url + '/' + id );

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
