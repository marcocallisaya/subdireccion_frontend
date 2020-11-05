import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, zip } from 'rxjs';
import { DocumentoService } from 'src/app/core/services/documento.service';
import { TipoDocumentoService } from 'src/app/core/services/tipo-documento.service';
import { UbicacionService } from 'src/app/core/services/ubicacion.service';
import { TramiteService } from 'src/app/core/services/tramite.service';
import { switchMap } from 'rxjs/operators';
import { Documento } from 'src/app/shared/models/documento.model';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-documento-form',
  templateUrl: './documento-form.component.html',
  styleUrls: ['./documento-form.component.scss']
})

export class DocumentoFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  documento$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  codigo; // id del modelo

  public documento: Documento; // datos del modelo

  tiposDocumento; ubicaciones; tramites;

  estado = [{nombre: 'PASIVO', valor: 'pasivo'}, {nombre: 'ACTIVO', valor: 'activo'}];

  constructor(private fb: FormBuilder,
              private servicio: DocumentoService,
              private route: ActivatedRoute,
              private router: Router,
              private tipoDocumento: TipoDocumentoService,
              private ubicacion: UbicacionService,
              private tramite: TramiteService,
              private location: Location) { }



  ngOnInit(): void {
  this.cargarDatos();
  }

  cargarDatos(): void {
    this.documento$.add(
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
      } else {
        // actualizar
        this.documento = res.data;
        this.BanderaBoton = true;
      }
      this.cargarDatosAdicionales();
      this.cargarFormulario();
      this.BanderaDatos = true;
    }));
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      nombre: [this.documento?.nombre || '', Validators.required],
      codigo: [this.documento?.codigo || '', Validators.required],
      descripcion: [this.documento?.descripcion || '', Validators.required],
      numero_paginas: [this.documento?.numero_paginas || '', Validators.required],
      estado: [this.documento?.estado || '', Validators.required],
      tipo_documento_id: [this.documento?.tipo_documento_id || '', Validators.required],
      ubicacion_id: [this.documento?.ubicacion_id || null],
      tramite_id: [this.documento?.tramite_id || '', Validators.required]
    });
  }

  cargarDatosAdicionales(): void {
    zip(
      this.tipoDocumento.get(),
      this.ubicacion.get(),
      this.tramite.get()
    ).subscribe( resp => {
      const [resp1, resp2, resp3] = resp;
      this.tiposDocumento = resp1.data;
      this.ubicaciones = resp2.data;
      this.tramites = resp3.data;
    });

  }

  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El documento ha sido registrado con exito',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/sistema/documento']);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Ha habido un error'
        });
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
      this.router.navigate(['/sistema/documento']);
    });
  }

  atras(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.documento$.unsubscribe();
  }

}