import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantesService {

  constructor() { }

  // readonly Url: string = 'https://qyqweb.herokuapp.com';
  readonly URL: string = 'http://127.0.0.1:8000/api/';
  readonly mapKey: string = 'pk.eyJ1IjoibWFyY29jYWxsaXNheWEiLCJhIjoiY2p4YnhzcWhnMGF1MjN6czNsMGdqY2Z2dCJ9.pRgkj2hwb7-2K6xOYUKHIg';
}
