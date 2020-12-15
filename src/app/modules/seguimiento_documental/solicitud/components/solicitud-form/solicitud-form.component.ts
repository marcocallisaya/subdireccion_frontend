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

  solicitanteSeleccionado;

  BanderaBusqueda;

  uri = 'solicitud';

  filteredProducts; nameLiteral = '';

  tiposSolicitante = [{codigo: 'Nombre', value: 'nombre'}, {codigo: 'Carnet', value: 'ci'}];

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
      solicitante_id: [this.solicitud?.solicitante_id || '', Validators.required],
      ingreso: [this.solicitud?.ingreso || this.obtenerFechaActual(), Validators.required]
    });
  }

  cargarDatosBusqueda(nombre, tipo): void {
    this.solicitante.getWithQuery(nombre, tipo).subscribe( (res: any) => {
      this.solicitantes = res;
      console.log(res);
    });
  }

  obtenerFechaActual(): string {
    let f = new Date();
    console.log(f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() );
    return f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate();
  }

  seleccionarSolicitante(solicitante): void {
    this.solicitanteSeleccionado = solicitante;
    this.BanderaBusqueda = true;
  }

  reBusqueda(): void {
    this.BanderaBusqueda = false;
  }

  cargarDatosAdicionales(): void {
    zip(
      this.centro.get(),
      this.tipo.get()
    ).subscribe( resp => {
      const [resp1, resp2] = resp;
      this.centros = resp1;
      this.tipos = resp2;
    });

  }

  imprimir(name): void {
    console.log(name);
    console.log(this.solicitantes);
    this.filteredProducts = this.filterData(name);
    console.log( this.filteredProducts);
  }

  selectOpt(solicitante: Solicitante): void {
    console.log(solicitante);
    this.myForm.controls.solicitante_id.setValue(solicitante.id);
    this.nameLiteral = solicitante.nombre + ' ' + solicitante.apellido;
    console.log(this.nameLiteral);
  }

  filterData(name): any {
    return  this.solicitantes.filter((item) => item.nombre.toLowerCase().includes(name.toLowerCase()));
  }

  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire( 'Felicidades',
        'La solicitud ha sido registrada con exito',
        'success');
        this.router.navigate(['/sistema/' + this.uri]);
      },
      error => {
        const errores =  this.tratarErrores(error.error.errors);
        this.mostrarError(errores);
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
      const errores =  this.tratarErrores(error.error.errors);
      this.mostrarError(errores);
    });
  }

  atras(): void {
    this.location.back();
  }

  tratarErrores(errores): string {
    let datos = '';
    if (errores.referencia !=  null) {
      const error = '<div>' + errores.referencia[0] + '</div> <br>';
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

  ngOnDestroy(): void {
    this.solicitud$.unsubscribe();
  }

}
