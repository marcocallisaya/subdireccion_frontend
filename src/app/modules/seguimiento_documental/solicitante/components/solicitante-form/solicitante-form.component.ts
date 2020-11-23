import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SolicitanteService } from 'src/app/core/services/solicitante.service';
import { TipoSolicitanteService } from 'src/app/core/services/tipo-solicitante.service';
import { Solicitante } from 'src/app/shared/models/solicitante.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitante-form',
  templateUrl: './solicitante-form.component.html',
  styleUrls: ['./solicitante-form.component.scss']
})
export class SolicitanteFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  solicitante$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  solicitante: Solicitante; // datos del modelo

  tiposSolicitante;

  uri = 'solicitante';

  constructor(private fb: FormBuilder,
              private servicio: SolicitanteService,
              private route: ActivatedRoute,
              private router: Router,
              private tipoSolicitante: TipoSolicitanteService,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.solicitante$.add(
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
        this.solicitante = res.data;
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
      nombre: [this.solicitante?.nombre || '', Validators.required],
      apellido: [this.solicitante?.apellido || '', Validators.required],
      telefono: [this.solicitante?.telefono || '', Validators.required],
      ci: [this.solicitante?.ci || '', Validators.required],
      tipo_solicitante_id: [this.solicitante?.tipo_solicitante_id || '', Validators.required]
    });
  }

  cargarDatosAdicionales(): void {
    zip(
      this.tipoSolicitante.get()
    ).subscribe( resp => {
      const [resp1] = resp;
      this.tiposSolicitante = resp1;
    });

  }


  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire(
          'Felicidades',
          'El solicitante ha sido registrado con exito',
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
    if (errores.ci !=  null) {
      const error = '<div>' + errores.ci[0] + '</div> <br>';
      datos = datos.concat(error);
    }
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
    this.solicitante$.unsubscribe();
  }

}
