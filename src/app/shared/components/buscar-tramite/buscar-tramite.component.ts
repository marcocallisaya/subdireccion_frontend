import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {TramiteService} from '../../../core/services/tramite.service';
import { Tramite } from '../../models/tramite.model';

@Component({
  selector: 'app-buscar-tramite',
  templateUrl: './buscar-tramite.component.html',
  styleUrls: ['./buscar-tramite.component.scss']
})
export class BuscarTramiteComponent implements OnInit {


  BanderaBusqueda;
  @Output() myEvent = new EventEmitter();
  tramiteSeleccionado ;
  tramites;
  tipos = [{value: 'referencia', codigo: 'Referencia'},{value: 'codigo', codigo: 'Codigo'}];
  constructor(private tramite: TramiteService) { }

  ngOnInit(): void {
    console.log('ardilla');
  }


  
}
