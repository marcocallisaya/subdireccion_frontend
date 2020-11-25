import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarreraService } from 'src/app/core/services/carrera.service';
import { CentroFormacionService } from 'src/app/core/services/centro-formacion.service';
import { Carrera } from 'src/app/shared/models/carrera.model';
import { CentroFormacion } from 'src/app/shared/models/centro_formacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrera-modal',
  templateUrl: './carrera-modal.component.html',
  styleUrls: ['./carrera-modal.component.scss']
})
export class CarreraModalComponent implements OnInit {

  BanderaBoton = false;

  BanderaDatos: boolean;

  nameLiteral = '' ; filteredProducts ; codigo;

  myForm: FormGroup; // formulario reactivo

  carreras: Carrera[];
  totalCarreras: Carrera[];
  niveles = ['AUXILIAR', 'BASICO', 'MEDIO', 'SUPERIOR'];

  constructor(private servicio: CentroFormacionService,
              private carrera: CarreraService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<CarreraModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.cargarFormulario();
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.carrera.get().subscribe(res => this.totalCarreras = res);
    this.carreras = this.data.carreras;
    this.BanderaDatos = this.verExistencia(this.data);
  }

  imprimir(name): void {
    console.log(name);
    console.log(this.carreras);
    this.filteredProducts = this.filterData(name);
    console.log( this.filteredProducts);
  }

  selectOpt(carrera: Carrera): void {
    this.BanderaBoton = true;
    console.log(carrera);
    this.nameLiteral = carrera.nombre;
    this.codigo = carrera.id;
    console.log(this.nameLiteral);
  }

  filterData(name): any {
    return  this.totalCarreras.filter((item) => item.nombre.toLowerCase().includes(name.toLowerCase()));
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      carrera_id:  [''],
      nivel:  ['', Validators.required]
    });
  }

  enviar(id): void {
    this.myForm.controls.carrera_id.setValue(this.codigo);
    console.log(this.myForm.value);
    this.servicio.getCarreras(this.data.id, this.myForm.value).subscribe(res => {
      this.carreras = res;
      Swal.fire(
        'Correcto',
        'Se ha adiciondo la carrera de manera exitosa',
        'success'
      );});
  }

  verExistencia(data: any): boolean {
    return (data.length === 0) ? false : true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  eliminar(id: number): void {
    const data = {carrera_id : id};
    console.log(id);
    this.servicio.deleteCarrera(this.data.id, data).subscribe(res => {
      this.carreras = res;
      Swal.fire(
        'Correcto',
        'Se ha eliminado de manera exitosa',
        'success'
      );
    });
  }

}
