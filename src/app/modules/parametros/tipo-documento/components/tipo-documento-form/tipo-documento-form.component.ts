import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TipoDocumentoService } from 'src/app/core/services/tipo-documento.service';
import { TipoDocumento } from 'src/app/shared/models/tipo_documento.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-documento-form',
  templateUrl: './tipo-documento-form.component.html',
  styleUrls: ['./tipo-documento-form.component.scss']
})
export class TipoDocumentoFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  tipo$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  tipo: TipoDocumento; // datos del modelo

  tiposDocumento; ubicaciones; tramites;

  uri = 'tipo_documento';

  constructor(private fb: FormBuilder,
              private servicio: TipoDocumentoService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.tipo$.add(
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
        this.tipo = res.data;
        this.BanderaBoton = true;
        this.BanderaTitulo = 'ACTUALIZACION';
      }
      this.cargarFormulario();
      this.BanderaDatos = true;
    }));
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      nombre: [this.tipo?.nombre || '', Validators.required],
      descripcion: [this.tipo?.descripcion || '', Validators.required],
      codigo: [this.tipo?.codigo || '', Validators.required]
    });
  }


  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El tipo de documento ha sido registrado con exito',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/sistema/' + this.uri]);
      },
      error => {
        this.mostrarErrores(error);
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
        this.mostrarErrores(error);
      });
  }

  mostrarErrores(error): void {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      html: error.error.errors.descripcion[0]
    });
  }

  atras(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.tipo$.unsubscribe();
  }

}
