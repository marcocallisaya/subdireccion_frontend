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
import { LoginService } from 'src/app/core/authentication/login.service';

@Component({
  selector: 'app-documento-form',
  templateUrl: './documento-form.component.html',
  styleUrls: ['./documento-form.component.scss']
})

export class DocumentoFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  BanderaBusqueda;

  documento$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  documento: Documento; // datos del modelo

  tramiteSeleccionado;

  tiposDocumento; ubicaciones; tramites;

  tipos = [{value: 'referencia', codigo: 'Referencia'},{value: 'codigo', codigo: 'Codigo'}];

  estado = [{nombre: 'PASIVO', valor: 'pasivo'}, {nombre: 'ACTIVO', valor: 'activo'}];

  constructor(private fb: FormBuilder,
              private servicio: DocumentoService,
              private route: ActivatedRoute,
              private router: Router,
              private token: LoginService,
              private tipoDocumento: TipoDocumentoService,
              private ubicacion: UbicacionService,
              private tramite: TramiteService,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatosBusqueda(nombre, tipo, fechaInicial, fechaFinal): void {
    this.tramite.getWithQueryII(tipo, nombre, fechaInicial, fechaFinal).subscribe( (res: any) => {
      this.tramites = res.data;
      console.log(res);
    //  this.BanderaBusqueda = true;
    }, err => {
      Swal.fire(
        'Error',
        err.error.errors.fechaFinal[0],
        'error'
      );
    });
  }

  seleccionarSolicitante(solicitante): void {
    this.tramiteSeleccionado = solicitante;
    this.BanderaBusqueda = true;
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
        this.BanderaTitulo = 'REGISTRO';
      } else {
        // actualizar
        this.documento = res.data;
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
      nombre: [this.documento?.nombre || ''],
      descripcion: [this.documento?.descripcion || ''],
      numero_paginas: [this.documento?.numero_paginas || ''],
      tipo_documento_id: [this.documento?.tipo_documento_id || 1, Validators.required],
      ubicacion_id: [this.documento?.ubicacion_id || ''],
      ingreso: [this.documento?.ingreso || this.obtenerFechaActual()],
      tramite_id: [ {value: this.documento?.tramite_id || '', disabled: this.BanderaBoton }, Validators.required]
    });
  }

  obtenerFechaActual(): string {
    let f = new Date();
    console.log(f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() );
    return f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate();
  }

  cargarDatosAdicionales(): void {
    zip(
      this.tipoDocumento.get(),
      this.ubicacion.get()
    ).subscribe( resp => {
      const [resp1, resp2] = resp;
      this.tiposDocumento = resp1;
      this.ubicaciones = resp2;
    });

  }


  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire(
          'Felicidades',
          'Se ha registrado el documento de manera exitosa',
          'success'
        );
        this.router.navigate(['/sistema/documento']);
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
    if (errores.descripcion !=  null) {
      const error = '<div>' + errores.descripcion[0] + '</div> <br>';
      datos = datos.concat(error);
    }
    if (errores.nombre !=  null) {
      const error = '<div>' + errores.nombre[0] + '</div> <br>';
      datos = datos.concat(error);
    }
    if (errores.numero_paginas !=  null) {
      const error = '<div>' + errores.numero_paginas[0] + '</div> <br>';
      datos = datos.concat(error);
    }
    return datos;
  }

  mostrarError(errores): void {
    console.log(errores);
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      html: errores
    });
  }

  reBusqueda(): void {
    this.BanderaBusqueda = false;
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
    },
    error => {
      const errores =  this.tratarErrores(error.error.errors);
      this.mostrarError(errores);
    });
  }

  atras(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.documento$.unsubscribe();
  }

}
