import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, zip } from 'rxjs';
import { DerivacionService } from 'src/app/core/services/derivacion.service';
import { TramiteService } from 'src/app/core/services/tramite.service';
import { FuncionarioService } from 'src/app/core/services/funcionario.service';
import { Derivacion } from 'src/app/shared/models/derivacion.model';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import { Tramite } from 'src/app/shared/models/tramite.model';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/core/authentication/login.service';

@Component({
  selector: 'app-derivacion-form',
  templateUrl: './derivacion-form.component.html',
  styleUrls: ['./derivacion-form.component.scss']
})
export class DerivacionFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  BanderaBusqueda;

  derivacion$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  tramiteSeleccionado;

  derivacion: Derivacion; // datos del modelo

  tramites;  funcionarios: Funcionario[];

  tipos = [{value: 'referencia', codigo: 'Referencia'},{value: 'codigo', codigo: 'Codigo'}];

  uri = 'derivacion';

  constructor(private fb: FormBuilder,
              private token: LoginService,
              private servicio: DerivacionService,
              private route: ActivatedRoute,
              private router: Router,
              private tramite: TramiteService,
              private funcionario: FuncionarioService,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatosBusqueda(nombre, tipo): void {
    this.tramite.getWithQuery(tipo, nombre, 'SOLICITUD').subscribe( (res: any) => {
      this.tramites = res.data;
      console.log(res);
    //  this.BanderaBusqueda = true;
    });
  }

  seleccionarSolicitante(solicitante): void {
    this.tramiteSeleccionado = solicitante;
    this.BanderaBusqueda = true;
   }

  cargarDatos(): void {
    this.derivacion$.add(
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
        this.derivacion = res.data;
        this.BanderaBoton = true;
        this.BanderaTitulo = 'ACTUALIZACION';
      }
      this.cargarDatosAdicionales();
      this.cargarFormulario();
      this.BanderaDatos = true;
    }));
  }
// {value: this.derivacion?.tramite.dias || '', disabled: this.BanderaBoton }
  cargarFormulario(): void {
    this.myForm = this.fb.group({
      tramite_id: [ {value: this.derivacion?.tramite_id || '', disabled: this.BanderaBoton }, Validators.required],
      funcionario_id: [this.derivacion?.funcionario_id || 2, Validators.required],
      fecha_limite: [{value: this.derivacion?.tramite.fecha_limite || this.obtenerFechaActual(), disabled: this.BanderaBoton }, Validators.required],
      ingreso: [this.derivacion?.ingreso || this.obtenerFechaActual(), Validators.required]
    });
  }


  obtenerFechaActual(): string {
    let f = new Date();
    console.log(f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() );
    return f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate();
  }
  cargarDatosAdicionales(): void {
    zip(
      this.funcionario.get()
    ).subscribe( resp => {
      const [resp1] = resp;
      this.funcionarios = resp1;
    });

  }

  reBusqueda(): void {
    this.BanderaBusqueda = false;
  }

  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire( 'Felicidades',
        'La derivacion ha sido registrada con exito',
        'success');
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
    if (errores.fecha_limite !=  null) {
      const error = '<div>' + errores.fecha_limite[0] + '</div> <br>';
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
    this.derivacion$.unsubscribe();
  }

}
