import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EstanteService } from 'src/app/core/services/estante.service';
import { UbicacionService } from 'src/app/core/services/ubicacion.service';
import { Estante } from 'src/app/shared/models/estante.model';
import { Ubicacion } from 'src/app/shared/models/ubicacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ubicacion-form',
  templateUrl: './ubicacion-form.component.html',
  styleUrls: ['./ubicacion-form.component.scss']
})
export class UbicacionFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  ubicacion$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  ubicacion: Ubicacion; // datos del modelo

  uri = 'ubicacion';

  estantes: Estante[];

  estados = ['DISPONIBLE', 'NO DISPONIBLE'];

  constructor(private fb: FormBuilder,
              private servicio: UbicacionService,
              private estante: EstanteService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
    this.cargarDatosAdicionales();
  }

  cargarDatos(): void {
    this.ubicacion$.add(
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
        this.ubicacion = res.data;
        this.BanderaBoton = true;
        this.BanderaTitulo = 'ACTUALIZACION';
      }
      this.cargarFormulario();
      this.BanderaDatos = true;
    }));
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      disponibilidad: [this.ubicacion?.disponibilidad || '', Validators.required],
      color: [this.ubicacion?.color || '', Validators.required],
      estante_id: [this.ubicacion?.estante_id || '', Validators.required]
    });
  }

  cargarDatosAdicionales(): void {
    this.estante.get().subscribe(res => this.estantes = res);
    }

  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La ubicacion ha sido registrada con exito',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/sistema/' + this.uri]);
      },
      error => {
       console.log(error);
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
        console.log(error);
      });
  }

  atras(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.ubicacion$.unsubscribe();
  }

}
