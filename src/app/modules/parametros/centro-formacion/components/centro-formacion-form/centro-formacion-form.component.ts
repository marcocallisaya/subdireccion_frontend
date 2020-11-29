import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConstantesService } from 'src/app/config/constantes.service';
import { CentroFormacionService } from 'src/app/core/services/centro-formacion.service';
import { DistritoService } from 'src/app/core/services/distrito.service';
import { CentroFormacion } from 'src/app/shared/models/centro_formacion.model';
import { Distrito } from 'src/app/shared/models/distrito.model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-centro-formacion-form',
  templateUrl: './centro-formacion-form.component.html',
  styleUrls: ['./centro-formacion-form.component.scss']
})
export class CentroFormacionFormComponent implements OnInit, OnDestroy {

  BanderaDatos = false;

  centro$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  centro: CentroFormacion; // datos del modelo

  uri = 'centro_formacion';

  distritos: Distrito[];

  turnos = ['MAÑANA', 'TARDE', 'NOCHE'];

  tipos = ['CEA', 'CEE', 'CEP'];

  constructor(private fb: FormBuilder,
              private servicio: CentroFormacionService,
              private distrito: DistritoService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private url: ConstantesService) { }



  ngOnInit(): void {
    this.cargarDatos();
    this.cargarDatosAdicionales();
  }

  cargarDatos(): void {
    this.centro$.add(
    this.route.paramMap.pipe(
          switchMap((params) => {
            const id = params.get('id');
            if (id != null) {
            this.codigo = id;
            return this.servicio.getOne(parseInt(id, 10));
            }
            return of(null);
      })
    ).subscribe( (res) => {
      if (res === null) {
        // crear
        this.BanderaBoton = false;
        this.BanderaTitulo = 'REGISTRO';
      } else {
        // actualizar
        this.centro = res.data;
        console.log(res.data);
        this.BanderaBoton = true;
        this.BanderaTitulo = 'ACTUALIZACION';
      }

      this.BanderaDatos = true;
      this.cargarFormulario();
    }));
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      nombre: [this.centro?.nombre || '', Validators.required],
      sie: [this.centro?.sie || '', Validators.required],
      turno: [this.centro?.turno || '', Validators.required],
      tipo: [this.centro?.tipo || '', Validators.required],
      direccion: [this.centro?.direccion || '', Validators.required],
      telefono: [this.centro?.telefono || '', Validators.required],
      distrito_id: [this.centro?.distrito_id || '', Validators.required]
    });
  }


  enviar(myForm): void {

    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El centro de formacion ha sido registrado con exito',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/sistema/' + this.uri]);
      },
      error => {
        this.mostrarErrores(error);
      }
    );
  }

  cargarDatosAdicionales(): void  {
    this.distrito.get().subscribe(res => this.distritos = res);
  }

  actualizar(): void {
    console.log(this.myForm.value);
    this.servicio.update(this.myForm.value, this.codigo).subscribe(res => {
      Swal.fire(
        'Felicidades',
        'Se ha actualizado Exitosamente',
        'success'
      );
      this.router.navigate(['/sistema/' + this.uri]);
    },
      error => {
        this.mostrarErrores(error);
      });
  }

  mostrarErrores(error): void {
    console.log(error.error.errors);
    const errores = this.tratarErrores(error.error.errors);
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      html: errores
    });
  }

  tratarErrores(errores): string {
    let datos = '';
    if (errores.sie !=  null) {
      const error = '<div>' + errores.sie[0] + '</div> <br>';
      datos = datos.concat(error);
    }
    if (errores.direccion !=  null) {
      const error = '<div>' + errores.direccion[0] + '</div> <br>';
      datos = datos.concat(error);
    }

    return datos;
  }

  atras(): void {
    this.location.back();
  }


  ngOnDestroy(): void {
    this.centro$.unsubscribe();
  }

}
