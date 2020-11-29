import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate {

  permisos: string[];


  constructor(private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.permisos = JSON.parse(localStorage.getItem('permisos'));
    if (this.permisos === null) { this.router.navigate(['/']); }
    const permiso = route.data.permiso;
    return (this.permisos.includes(permiso)) ? true : false;
  }
}
