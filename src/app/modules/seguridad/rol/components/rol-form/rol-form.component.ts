import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RolService } from 'src/app/core/services/rol.service';
import { Rol } from 'src/app/shared/models/rol.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol-form',
  templateUrl: './rol-form.component.html',
  styleUrls: ['./rol-form.component.scss']
})
export class RolFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  rol$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  rol: Rol; // datos del modelo

  uri = 'rol';

  constructor(private fb: FormBuilder,
              private servicio: RolService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.rol$.add(
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
        this.rol = res.data;
        this.BanderaBoton = true;
        this.BanderaTitulo = 'ACTUALIZACION';
      }
      this.cargarFormulario();
      this.BanderaDatos = true;
    }));
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      nombre: [this.rol?.nombre || '', Validators.required],
      descripcion: [this.rol?.descripcion || '', Validators.required]
    });
  }


  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire('Felicidades',
        'El rol ha sido registrado con exito',
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
    if (errores.descripcion !=  null) {
      const error = '<div>' + errores.descripcion[0] + '</div> <br>';
      datos = datos.concat(error);
    }
    if (errores.nombre !=  null) {
      const error = '<div>' + errores.nombre[0] + '</div> <br>';
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
    this.rol$.unsubscribe();
  }

}
