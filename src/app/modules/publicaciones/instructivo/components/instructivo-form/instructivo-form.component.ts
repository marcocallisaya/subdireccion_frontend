import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FuncionarioService } from 'src/app/core/services/funcionario.service';
import { InstructivoService } from 'src/app/core/services/instructivo.service';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import { Instructivo } from 'src/app/shared/models/instructivo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructivo-form',
  templateUrl: './instructivo-form.component.html',
  styleUrls: ['./instructivo-form.component.scss']
})
export class InstructivoFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  instructivo$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  instructivo: Instructivo; // datos del modelo

  funcionarios: Funcionario[];

  uri = 'instructivo';

  constructor(private fb: FormBuilder,
              private servicio: InstructivoService,
              private route: ActivatedRoute,
              private router: Router,
              private funcionario: FuncionarioService,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.instructivo$.add(
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
        this.instructivo = res.data;
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
      destinatario: [this.instructivo?.destinatario || '', Validators.required],
      referencia: [this.instructivo?.referencia || '', Validators.required],
      funcionario_id: [this.instructivo?.funcionario_id || '', Validators.required]
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
          'El instructivo ha sido registrado con exito',
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
    this.instructivo$.unsubscribe();
  }

}
