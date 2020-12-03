import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PublicoRoutingModule, components } from './publico-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from 'src/app/shared/material.module';






@NgModule({
  declarations: [components, MenuComponent],
  imports: [
    CommonModule,
    PublicoRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class PublicoModule { }
