import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantesService {

  constructor() { }

  // readonly Url: string = 'https://qyqweb.herokuapp.com';
  readonly URL: string = 'http://127.0.0.1:8000/api/';
}
