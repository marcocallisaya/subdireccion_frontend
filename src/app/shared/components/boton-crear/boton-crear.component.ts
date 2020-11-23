import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boton-crear',
  templateUrl: './boton-crear.component.html',
  styleUrls: ['./boton-crear.component.scss']
})
export class BotonCrearComponent implements OnInit {

  @Input() titulo: string;

  constructor() { }

  ngOnInit(): void {
  }

}
