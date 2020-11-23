import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EvaluacionService } from 'src/app/core/services/evaluacion.service';
import { TramiteService } from 'src/app/core/services/tramite.service';
import { Evaluacion } from 'src/app/shared/models/evaluacion.model';
import { Tramite } from 'src/app/shared/models/tramite.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluacion-form',
  templateUrl: './evaluacion-form.component.html',
  styleUrls: ['./evaluacion-form.component.scss']
})
export class EvaluacionFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  evaluacion$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  evaluacion: Evaluacion; // datos del modelo

  tramites: Tramite[];

  estadoEvaluacion = ['CORRECTO', 'INCORRECTO', 'CON ERRORES'];

  uri = 'evaluacion';

  constructor(private fb: FormBuilder,
              private servicio: EvaluacionService,
              private route: ActivatedRoute,
              private router: Router,
              private tramite: TramiteService,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.evaluacion$.add(
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
        this.evaluacion = res.data;
        this.BanderaBoton = true;
        this.BanderaTitulo = 'ACTUALIZACION';
      }
      this.cargarDatosAdicionales();
      this.cargarFormulario();
      this.BanderaDatos = true;
    }));
  }

  // {value: this.evaluacion?.tramite_id || '', disabled: this.BanderaBoton }
  cargarFormulario(): void {
    this.myForm = this.fb.group({
      estado_evaluacion: [ this.evaluacion?.estado_evaluacion || '', Validators.required],
      tramite_id: [ {value: this.evaluacion?.tramite_id || '', disabled: this.BanderaBoton }, Validators.required],
      descripcion: [this.evaluacion?.descripcion || '', Validators.required]
    });
  }

  cargarDatosAdicionales(): void {
    zip(
      this.tramite.get()
    ).subscribe( resp => {
      const [resp1] = resp;
      this.tramites = resp1;
    });

  }


  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La evaluacion ha sido registrada con exito',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/sistema/' + this.uri]);
      },
      error => {
        console.log(error);
        const errores =  this.tratarErrores(error.error.errors);
        this.mostrarError(errores);
      }
    );
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
     console.log(error);
     const errores =  this.tratarErrores(error.error.errors);
     this.mostrarError(errores);
    });
  }

  tratarErrores(errores): string {
    let datos = '';
    if (errores.descripcion !=  null) {
      const error = '<div>' + errores.descripcion[0] + '</div> <br>';
      datos = datos.concat(error);
    }

    return datos;
  }

  mostrarError(errores): void {
    console.log(errores);
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      html: errores
    });
  }

  atras(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.evaluacion$.unsubscribe();
  }

}
