import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoginService } from 'src/app/core/authentication/login.service';
import { ConvocatoriaService } from 'src/app/core/services/convocatoria.service';
import { FuncionarioService } from 'src/app/core/services/funcionario.service';
import { Convocatoria } from 'src/app/shared/models/convocatoria.model';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-convocatoria-form',
  templateUrl: './convocatoria-form.component.html',
  styleUrls: ['./convocatoria-form.component.scss']
})
export class ConvocatoriaFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  convocatoria$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  convocatoria: Convocatoria; // datos del modelo

  funcionarios: Funcionario[];

  uri = 'convocatoria';

  constructor(private fb: FormBuilder,
              private servicio: ConvocatoriaService,
              private route: ActivatedRoute,
              private router: Router,
              private token: LoginService,
              private funcionario: FuncionarioService,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.convocatoria$.add(
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
        this.convocatoria = res.data;
        this.BanderaBoton = true;
        this.BanderaTitulo = 'ACTUALIZACION';
      }
      this.cargarDatosAdicionales();
      this.cargarFormulario();
      this.BanderaDatos = true;
    }));
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      fecha_limite: [this.convocatoria?.fecha_limite || '', Validators.required],
      referencia: [this.convocatoria?.referencia || '', Validators.required],
      funcionario_id: [this.convocatoria?.funcionario_id || this.token.getDatosPersonales().id]
    });
  }

  cargarDatosAdicionales(): void {
    zip(
      this.funcionario.get()
    ).subscribe( resp => {
      const [resp1] = resp;
      this.funcionarios = resp1;
    });

  }


  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire(
          'Felicidades',
          'La convocatoria ha sido registrada con exito',
          'success'
        );
        this.router.navigate(['/sistema/' + this.uri]);
      },
      error => {
        console.log(error);
        const errores =  this.tratarErrores(error.error.errors);
        this.mostrarError(errores);
      }
    );
  }

  tratarErrores(errores): string {
    let datos = '';
    if (errores.referencia !=  null) {
      const error = '<div>' + errores.referencia[0] + '</div> <br>';
      datos = datos.concat(error);
    }
    return datos;
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
    this.convocatoria$.unsubscribe();
  }

}
