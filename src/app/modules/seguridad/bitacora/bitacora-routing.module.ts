import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { ModalComponent } from './modal/modal.component';
import { ReporteDetallesComponent } from './reporte-detalles/reporte-detalles.component';

const routes: Routes = [
  {path: '', component: BitacoraComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_bitacora' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitacoraRoutingModule { }

export const componentes = [BitacoraComponent, ModalComponent, ReporteDetallesComponent];
