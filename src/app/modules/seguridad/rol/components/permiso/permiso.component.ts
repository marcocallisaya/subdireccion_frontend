import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { RolService } from 'src/app/core/services/rol.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Permiso } from 'src/app/shared/models/permiso.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.scss']
})
export class PermisoComponent implements OnInit, OnDestroy {

  role;
  person;
  codigo;
  data;
  permisions: string[] = [];
  dataPermissions;
  dataTypes;

  rolePermissions: string[] = [];

  role$: Subscription = new Subscription();



  formBoolean: boolean;
  isUpdated;

  constructor(private usuario: UsuarioService,
              private rol: RolService,
              private permiso: PermisoService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {

    this.permiso.get().subscribe(
      (res: any) => {this.dataPermissions = res.permisos; console.log(res);
                     this.dataTypes = res.tipos; console.log(res.tipos); }
    );

    this.role$.add( this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id != null) {
          this.codigo = id;
          return this.rol.getOne(parseInt(id, 10));
        }
        return of(null);
      })
    ).subscribe( (res) => {
      if (res === null) {
        // crear
        this.isUpdated = false;
      } else {
        // actualizar
        this.isUpdated = true;
        console.log(res);
        this.convert(res.data.permisos);
        console.log(this.rolePermissions);
        this.permisions = this.rolePermissions;
        console.log(this.permisions);
      }
      this.formBoolean = true;
    }));

  }



  onCheckboxChange(e: any): void {
    console.log(e);
    if (e.checked) {

      this.permisions.push(e.source.value);
      console.log(this.permisions);

    } else {
    this.permisions =  this.removeItemFromArr(this.permisions, e.source.value);
    console.log(this.permisions);
    }

  }

  removeItemFromArr = ( arr, item ) => {
    return arr.filter( e => e !== item );
  }

  convert(data: any): void { data.forEach(element => {
    this.rolePermissions.push(element.id);
  }); }


  verify(item): boolean {
    if (this.rolePermissions.includes(item)) {
      return true;
    } else { return false; }
  }

  ver(data1, data2): boolean {
    if (data1 === data2) {
      return true;
    } else {return false; }
  }

  update(): void {
    this.data = {permisos: this.permisions};
    this.rol.updatePermisos(this.data, this.codigo).subscribe((res: any) => {
      Swal.fire(
        'Felicidades',
         res.data,
        'success'
      );
      console.log(res);
      this.router.navigate(['/sistema/rol']);
    }, err => console.log(err));
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void  {
   this.role$.unsubscribe();
  }

}
