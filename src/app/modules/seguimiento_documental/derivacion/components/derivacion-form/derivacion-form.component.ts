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

@Component({
  selector: 'app-derivacion-form',
  templateUrl: './derivacion-form.component.html',
  styleUrls: ['./derivacion-form.component.scss']
})
export class DerivacionFormComponent implements OnInit, OnDestroy {

  BanderaDatos: boolean;

  derivacion$: Subscription = new Subscription();

  myForm: FormGroup; // formulario reactivo

  BanderaBoton; // bandera para el boton

  BanderaTitulo;

  codigo; // id del modelo

  derivacion: Derivacion; // datos del modelo

  tramites: Tramite[];  funcionarios: Funcionario[];

  estado = [{nombre: 'PASIVO', valor: 'pasivo'}, {nombre: 'ACTIVO', valor: 'activo'}];

  uri = 'derivacion';

  constructor(private fb: FormBuilder,
              private servicio: DerivacionService,
              private route: ActivatedRoute,
              private router: Router,
              private tramite: TramiteService,
              private funcionario: FuncionarioService,
              private location: Location) { }



  ngOnInit(): void {
    this.cargarDatos();
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
      funcionario_id: [this.derivacion?.funcionario_id || '', Validators.required],
      dias: [{value: this.derivacion?.tramite.dias || '', disabled: this.BanderaBoton }, Validators.required]
    });
  }

  cargarDatosAdicionales(): void {
    zip(
      this.tramite.get(),
      this.funcionario.get()
    ).subscribe( resp => {
      const [resp1, resp2] = resp;
      this.tramites = resp1;
      this.funcionarios = resp2;
    });

  }


  enviar(myForm): void {
    console.log(myForm.value);
    this.servicio.send(myForm.value).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La derivacion ha sido registrada con exito',
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
    this.derivacion$.unsubscribe();
  }

}
