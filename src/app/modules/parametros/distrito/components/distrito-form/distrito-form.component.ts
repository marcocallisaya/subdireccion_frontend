import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DistritoService } from 'src/app/core/services/distrito.service';
import { Distrito } from 'src/app/shared/models/distrito.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-distrito-form',
  templateUrl: './distrito-form.component.html',
  styleUrls: ['./distrito-form.component.scss']
})
export class DistritoFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  distrito$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  distrito: Distrito; // datos del modelo

  uri = 'distrito';

  constructor(private fb: FormBuilder,
              private servicio: DistritoService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.distrito$.add(
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
        this.distrito = res.data;
        this.BanderaBoton = true;
        this.BanderaTitulo = 'ACTUALIZACION';
      }
      this.cargarFormulario();
      this.BanderaDatos = true;
    }));
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      nombre: [this.distrito?.nombre || '', Validators.required],
      telefono: [this.distrito?.telefono || '', Validators.required],
      direccion: [this.distrito?.direccion || '', Validators.required],
      ciudad: [this.distrito?.ciudad || '', Validators.required]
    });
  }


  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire('Felicidades',
        'El distrito ha sido registrado con exito',
        'success');
        this.router.navigate(['/sistema/' + this.uri]);
      },
      error => {
        const errores =  this.tratarErrores(error.error.errors);
        this.mostrarErrores(errores);
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
        const errores =  this.tratarErrores(error.error.errors);
        this.mostrarErrores(errores);
      });
  }

  tratarErrores(errores): string {
    let datos = '';
    if (errores.nombre !=  null) {
      const error = '<div>' + errores.nombre[0] + '</div> <br>';
      datos = datos.concat(error);
    }
    if (errores.ciudad !=  null) {
      const error = '<div>' + errores.ciudad[0] + '</div> <br>';
      datos = datos.concat(error);
    }
    if (errores.direccion !=  null) {
      const error = '<div>' + errores.direccion[0] + '</div> <br>';
      datos = datos.concat(error);
    }
    return datos;
  }

  mostrarErrores(error): void {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      html: error
    });
  }

  atras(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.distrito$.unsubscribe();
  }

}
