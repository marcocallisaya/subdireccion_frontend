import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoginService } from 'src/app/core/authentication/login.service';
import { CircularService } from 'src/app/core/services/circular.service';
import { FuncionarioService } from 'src/app/core/services/funcionario.service';
import { Circular } from 'src/app/shared/models/circular.model';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-circular-form',
  templateUrl: './circular-form.component.html',
  styleUrls: ['./circular-form.component.scss']
})
export class CircularFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  circular$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  circular: Circular; // datos del modelo

  funcionarios: Funcionario[];

  uri = 'circular';

  constructor(private fb: FormBuilder,
              private servicio: CircularService,
              private route: ActivatedRoute,
              private router: Router,
              private token: LoginService,
              private funcionario: FuncionarioService,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.circular$.add(
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
        this.circular = res.data;
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
      codigo: [this.circular?.codigo || '', Validators.required],
      referencia: [this.circular?.referencia || '', Validators.required],
      funcionario_id: [this.circular?.funcionario_id || this.token.getDatosPersonales().id],
      remitente: [this.circular?.remitente || '', Validators.required],
      receptor: [this.circular?.receptor || '', Validators.required],
      fecha_registro: [this.circular?.fecha_registro || this.obtenerFechaActual(), Validators.required]
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
          'La circular ha sido registrada con exito',
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

  obtenerFechaActual(): string {
    let f = new Date(); let d ; let m ; let y = f.getFullYear(); 

    if (f.getDate()<10) { d = "0" + f.getDate();} else {d = f.getDate();}

    if (f.getMonth()<10) {m = "0" + (f.getMonth() + 1); } else {m = (f.getMonth() + 1);}

    let date = y + "-" + m + "-" + d;

    return  date;
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
    this.circular$.unsubscribe();
  }

}
