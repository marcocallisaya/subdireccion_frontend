import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, zip } from 'rxjs';
import { SolicitanteService } from 'src/app/core/services/solicitante.service';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
import { CentroFormacionService } from 'src/app/core/services/centro-formacion.service';
import { Solicitud } from 'src/app/shared/models/solicitud.model';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { TipoTramiteService } from 'src/app/core/services/tipo-tramite.service';
import { Solicitante } from 'src/app/shared/models/solicitante.model';
import { CentroFormacion } from 'src/app/shared/models/centro_formacion.model';
import { TipoTramite } from 'src/app/shared/models/tipo_tramite.model';

@Component({
  selector: 'app-solicitud-form',
  templateUrl: './solicitud-form.component.html',
  styleUrls: ['./solicitud-form.component.scss']
})
export class SolicitudFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  solicitud$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  solicitud: Solicitud; // datos del modelo

  solicitantes: Solicitante[]; centros: CentroFormacion[]; tipos: TipoTramite[];

  estado = [{nombre: 'PASIVO', valor: 'pasivo'}, {nombre: 'ACTIVO', valor: 'activo'}];

  uri = 'solicitud';

  constructor(private fb: FormBuilder,
              private servicio: SolicitudService,
              private route: ActivatedRoute,
              private router: Router,
              private solicitante: SolicitanteService,
              private centro: CentroFormacionService,
              private tipo: TipoTramiteService,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.solicitud$.add(
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
        this.solicitud = res.data;
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
      centro_formacion_id: [this.solicitud?.centro_formacion_id || '', Validators.required],
      referencia: [{value: this.solicitud?.tramite.referencia || '', disabled: this.BanderaBoton }, Validators.required],
      tipo_tramite_id: [{value: this.solicitud?.tramite.tipo_tramite_id || '', disabled: this.BanderaBoton}, Validators.required],
      solicitante_id: [this.solicitud?.solicitante_id || '', Validators.required]
    });
  }

  cargarDatosAdicionales(): void {
    zip(
      this.centro.get(),
      this.solicitante.get(),
      this.tipo.get()
    ).subscribe( resp => {
      const [resp1, resp2, resp3] = resp;
      this.centros = resp1;
      this.solicitantes = resp2;
      this.tipos = resp3;
    });

  }


  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La solicitud ha sido registrada con exito',
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
    this.solicitud$.unsubscribe();
  }

}
