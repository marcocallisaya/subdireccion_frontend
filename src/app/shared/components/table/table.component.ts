import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() { }

  @Input() dataSource: any; // toda la informacion
  @Input() width: string; // toda la informacion
  @Input() align = 'justify'; // toda la informacion
  @Input() headers; // campos del modelo
  @Input() opciones; // acciones que posee el modelo
  @Output() envio = new EventEmitter();
  data: string[] = [];



  enviar(id, tipo, data): void {
    data = {identificador: id, tipoAccion: tipo, informacion: data};
    this.envio.emit(data);
  }

  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista(): void {
    this.opciones.forEach(element => this.data.push(element.nombre));
  }


}
