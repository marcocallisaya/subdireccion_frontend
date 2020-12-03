import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicoComponent } from '../../core/publico/publico.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { DocumentoComponent } from './components/documento/documento.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { CeaComponent } from './components/cea/cea.component';
import { CeeComponent } from './components/cee/cee.component';
import { CepComponent } from './components/cep/cep.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { CarreraComponent } from './components/carrera/carrera.component';
import { CircularComponent } from './components/circular/circular.component';
import { ConvocatoriaComponent } from './components/convocatoria/convocatoria.component';
import { InstructivoComponent } from './components/instructivo/instructivo.component';

const routes: Routes = [
  {path: '', component: PublicoComponent, children: [
    {path: 'inicio', component: InicioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'circular', component: CircularComponent},
    {path: 'convocatoria', component: ConvocatoriaComponent},
    {path: 'instructivo', component: InstructivoComponent},
    {path: 'servicio', component: ServicioComponent},
    {path: 'cea', component: CeaComponent},
    {path: 'cee', component: CeeComponent},
    {path: 'cep', component: CepComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class PublicoRoutingModule { }

export const components = [PublicoComponent, InicioComponent, LoginComponent, DocumentoComponent,
                           ServicioComponent, CeaComponent, CeeComponent, CepComponent, MapaComponent,
                           CarreraComponent, CircularComponent, ConvocatoriaComponent, InstructivoComponent];
