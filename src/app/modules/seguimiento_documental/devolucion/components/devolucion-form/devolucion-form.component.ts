import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DevolucionService } from 'src/app/core/services/devolucion.service';
import { TramiteService } from 'src/app/core/services/tramite.service';
import { Devolucion } from 'src/app/shared/models/devolucion.model';
import { Tramite } from 'src/app/shared/models/tramite.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devolucion-form',
  templateUrl: './devolucion-form.component.html',
  styleUrls: ['./devolucion-form.component.scss']
})
export class DevolucionFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  evaluacion$: Subscription = new Subscription();

  BanderaBusqueda;

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  devolucion: Devolucion; // datos del modelo

  tramiteSeleccionado;

  tramites;

  tipos = [{value: 'referencia', codigo: 'Referencia'},{value: 'codigo', codigo: 'Codigo'}];

  estado = [{nombre: 'PASIVO', valor: 'pasivo'}, {nombre: 'ACTIVO', valor: 'activo'}];

  estadoDevolucion = ['EN ESPERA', 'APROBADO', 'RECHAZADO'];

  uri = 'devolucion';

  constructor(private fb: FormBuilder,
              private servicio: DevolucionService,
              private route: ActivatedRoute,
              private router: Router,
              private tramite: TramiteService,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatosBusqueda(nombre, tipo, fechaInicial, fechaFinal): void {
    this.tramite.getWithQuery(tipo, nombre, 'EVALUACION', fechaInicial, fechaFinal).subscribe( (res: any) => {
      this.tramites = res.data;
      console.log(res);
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
        this.devolucion = res.data;
        this.BanderaBoton = true;
        this.BanderaTitulo = 'ACTUALIZACION';
      }
      this.cargarFormulario();
      this.BanderaDatos = true;
    }));
  }

  // {value: this.devolucion?.tramite_id || '', disabled: this.BanderaBoton }
  cargarFormulario(): void {
    this.myForm = this.fb.group({
      estado_documento: [ this.devolucion?.estado_documento || 'EN ESPERA'],
      tramite_id: [ {value: this.devolucion?.tramite_id || '', disabled: this.BanderaBoton }, Validators.required],
      recomendacion: [this.devolucion?.recomendacion || '', Validators.required],
      ingreso: [this.devolucion?.ingreso || this.obtenerFechaActual()]
    });
  }

  obtenerFechaActual(): string {
    let f = new Date();
    console.log(f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() );
    return f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate();
  }


  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire( 'Felicidades',
        'La devolucion ha sido registrada con exito',
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
    if (errores.recomendacion !=  null) {
      const error = '<div>' + errores.recomendacion[0] + '</div> <br>';
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
