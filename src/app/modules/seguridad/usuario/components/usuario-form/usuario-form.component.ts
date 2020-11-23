import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FuncionarioService } from 'src/app/core/services/funcionario.service';
import { RolService } from 'src/app/core/services/rol.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import { Rol } from 'src/app/shared/models/rol.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  rol$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  usuario: Usuario; // datos del modelo

  uri = 'usuario';

  funcionarios: Funcionario[];

  roles: Rol[];

  constructor(private fb: FormBuilder,
              private servicio: UsuarioService,
              private route: ActivatedRoute,
              private funcionario: FuncionarioService,
              private rol: RolService,
              private router: Router,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
    this.cargarDatosAdicionales();
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
        this.usuario = res.data;
        this.BanderaBoton = true;
        this.BanderaTitulo = 'ACTUALIZACION';
      }
      this.cargarFormulario();
      this.BanderaDatos = true;
    }));
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      usuario: [this.usuario?.usuario || '', Validators.required],
      contrasena: [this.usuario?.contrasena || '', Validators.required],
      contrasena_confirmation: [''],
      rol_id: [this.usuario?.rol_id || '', Validators.required],
      funcionario_id: [this.usuario?.funcionario_id || '', Validators.required]
    });
  }

  cargarDatosAdicionales(): void {
    this.rol.get().subscribe(res => this.roles = res);
    this.funcionario.get().subscribe(res => this.funcionarios = res);
  }

  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El usuario ha sido registrado con exito',
          showConfirmButton: false,
          timer: 1500
        });
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
