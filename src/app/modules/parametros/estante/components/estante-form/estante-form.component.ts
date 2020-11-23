import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EstanteService } from 'src/app/core/services/estante.service';
import { Estante } from 'src/app/shared/models/estante.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estante-form',
  templateUrl: './estante-form.component.html',
  styleUrls: ['./estante-form.component.scss']
})
export class EstanteFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  estante$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  estante: Estante; // datos del modelo

  tiposDocumento; ubicaciones; tramites;

  uri = 'estante';

  constructor(private fb: FormBuilder,
              private servicio: EstanteService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.estante$.add(
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
        this.estante = res.data;
        this.BanderaBoton = true;
        this.BanderaTitulo = 'ACTUALIZACION';
      }
      this.cargarFormulario();
      this.BanderaDatos = true;
    }));
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      codigo: [this.estante?.codigo || '', Validators.required],
      material: [this.estante?.material || '', Validators.required],
      color: [this.estante?.color || '', Validators.required],
      altura: [this.estante?.altura || '', Validators.required],
      ancho: [this.estante?.ancho || '', Validators.required]
    });
  }


  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El estante ha sido registrado con exito',
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
    this.estante$.unsubscribe();
  }
}
