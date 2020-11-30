import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import Swal from 'sweetalert2';
import { LoginService } from '../authentication/login.service';
import { TokenService } from '../authentication/token.service';
import { FuncionarioService } from '../services/funcionario.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  funcionario$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  funcionario: Funcionario;

  uri = 'funcionario';

  generos = ['MASCULINO', 'FEMENINO'];

  constructor(private fb: FormBuilder,
              private servicio: FuncionarioService,
              private route: ActivatedRoute,
              private router: Router,
              private token: LoginService,
              private location: Location) { }

  codigo = this.token.getDatosPersonales().id; // id del modelo

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.servicio.getOne(this.codigo).subscribe(
      (res: any) => {
        this.funcionario = res.data;
        this.cargarFormulario();
        this.BanderaDatos = true;
      }
    );
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      nombre: [this.funcionario?.nombre || '', Validators.required],
      apellido: [this.funcionario?.apellido || '', Validators.required],
      fecha_nacimiento: [this.funcionario?.fecha_nacimiento || '', Validators.required],
      genero: [this.funcionario?.genero || '', Validators.required],
      telefono: [this.funcionario?.telefono || '', Validators.required]
    });
  }


  tratarErrores(errores): string {
    let datos = '';
    if (errores.nombre !=  null) {
      const error = '<div>' + errores.nombre[0] + '</div> <br>';
      datos = datos.concat(error);
    }
    if (errores.telefono !=  null) {
        const error = '<div>' + errores.telefono[0] + '</div> <br>';
        datos = datos.concat(error);
    }
    return datos;
  }

  actualizar(): void {
    console.log(this.myForm.value);
    this.servicio.update(this.myForm.value, this.codigo).subscribe(res => {
      Swal.fire(
        'Felicidades',
        'Datos personales actualizado Exitosamente',
        'success'
      );
      this.router.navigate(['/sistema']);
    },
    error => {
      console.log(error);
      const errores =  this.tratarErrores(error.error.errors);
      this.mostrarError(errores);
    });
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
    this.funcionario$.unsubscribe();
  }

}
