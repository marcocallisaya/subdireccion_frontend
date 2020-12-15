import { NgModule } from '@angular/core';
import {HeaderComponent} from '.././core/header/header.component';
import {FooterComponent} from '.././core/footer/footer.component';
import {NavbarComponent} from '.././core/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './components/link/link.component';
import { TableComponent } from './components/table/table.component';
import {BotonCrearComponent} from './components/boton-crear/boton-crear.component';
import {BuscarTramiteComponent} from './components/buscar-tramite/buscar-tramite.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    LinkComponent,
    TableComponent,
    SpinnerComponent,
    BotonCrearComponent,
    BuscarTramiteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
    exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    LinkComponent,
    TableComponent,
    SpinnerComponent,
    BotonCrearComponent,
    BuscarTramiteComponent,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class SharedModule { }
