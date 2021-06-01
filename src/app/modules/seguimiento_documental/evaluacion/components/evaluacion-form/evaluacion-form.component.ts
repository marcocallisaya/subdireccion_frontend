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

  BanderaBusqueda;

  evaluacion$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  evaluacion: Evaluacion; // datos del modelo

  tramites;

  tramiteSeleccionado;

  tipos = [{value: 'referencia', codigo: 'Referencia'},{value: 'codigo', codigo: 'Codigo'}];

  estadoEvaluacion = ['CORRECTO', 'INCORRECTO', 'CON ERRORES'];

  uri = 'evaluacion';

  spiner = true;

  tablaBandera = false;

  constructor(private fb: FormBuilder,
              private servicio: EvaluacionService,
              private route: ActivatedRoute,
              private router: Router,
              private tramite: TramiteService,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatosBusqueda(nombre, tipo, fechaInicial, fechaFinal): void {
    this.spiner = false;
    this.tramite.getWithQuery(tipo, nombre, 'DERIVACION', fechaInicial, fechaFinal).subscribe( (res: any) => {
      this.tramites = res.data;
      console.log(res);
      this.spiner = true;
      this.tablaBandera = true;
    //  this.BanderaBusqueda = true;
    }, err => {
      Swal.fire(
        'Error',
        err.error.errors.fechaFinal[0],
        'error'
      );
    });
  }

  seleccionarSolicitante(solicitante): void {
    this.tramiteSeleccionado = solicitante;
    this.BanderaBusqueda = true;
   }

   reBusqueda(): void {
    this.BanderaBusqueda = false;
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
        console.log(res.data);
        this.evaluacion = res.data;
        this.BanderaBoton = true;
        this.BanderaTitulo = 'ACTUALIZACION';
      }
      this.cargarFormulario();
      this.BanderaDatos = true;
    }));
  }

  // {value: this.evaluacion?.tramite_id || '', disabled: this.BanderaBoton }
  cargarFormulario(): void {
    this.myForm = this.fb.group({
      estado_evaluacion: [ this.evaluacion?.estado_evaluacion || 'CORRECTO'],
      tramite_id: [ {value: this.evaluacion?.tramite_id || '', disabled: this.BanderaBoton }],
      descripcion: [this.evaluacion?.descripcion || '', Validators.required],
      ingreso: [this.evaluacion?.ingreso || this.obtenerFechaActual()]
    });
  }

  obtenerFechaActual(): string {
    let f = new Date(); let d ; let m ; let y = f.getFullYear(); 
    
    if (f.getDate()<10) { d = "0" + f.getDate();} else {d = f.getDate();}

    if (f.getMonth()<10) {m = "0" + (f.getMonth() + 1); } else {m = (f.getMonth() + 1);}

    let date = y + "-" + m + "-" + d;

    return  date;
  }

  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire('Felicidades',
        'La evaluacion ha sido registrada con exito',
        'success');
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
