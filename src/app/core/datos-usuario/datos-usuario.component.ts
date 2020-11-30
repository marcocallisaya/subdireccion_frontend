import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Usuario } from 'src/app/shared/models/usuario.model';
import Swal from 'sweetalert2';
import { LoginService } from '../authentication/login.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.scss']
})
export class DatosUsuarioComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  rol$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  usuario: Usuario; // datos del modelo

  uri = 'usuario';

  constructor(private fb: FormBuilder,
              private servicio: UsuarioService,
              private route: ActivatedRoute,
              private router: Router,
              private token: LoginService,
              private location: Location) { }

  codigo = this.token.getUsuario().id; // id del modelo

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.servicio.getOne(this.codigo).subscribe((res: any) => {
      this.usuario = res.data;
      this.cargarFormulario();
      this.BanderaDatos = true;
    });
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      contrasena: ['', Validators.required],
      contrasena_confirmation: ['',  Validators.required]
    });
  }

  actualizar(): void {
    console.log(this.myForm.value);
    this.servicio.update(this.myForm.value, this.codigo).subscribe(res => {
      Swal.fire(
        'Felicidades',
        'Contraseña actualizada exitosamente',
        'success'
      );
      this.router.navigate(['/sistema']);
    },
      error => {
        const errores =  this.tratarErrores(error.error.errors);
        this.mostrarErrores(errores);
      });
  }

  mostrarErrores(error): void {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      html: error
    });
  }

  tratarErrores(errores): string {
    let datos = '';
    if (errores.usuario !=  null) {
      const error = '<div>' + errores.usuario[0] + '</div> <br>';
      datos = datos.concat(error);
    }
    if (errores.contrasena !=  null) {
      const error = '<div>' + errores.contrasena[0] + '</div> <br>';
      datos = datos.concat(error);
    }
    return datos;
  }

  atras(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.rol$.unsubscribe();
  }

}
