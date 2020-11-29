import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../authentication/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private token: LoginService, 
              private router: Router) { }

  usuario;

  ngOnInit(): void {
    this.usuario = this.token.getUsuario();
  }

  cargarusuario(): void {

  }

  cerrarSesion(): void {
    this.token.logout(this.usuario.id).subscribe(res => {
    console.log(res);
    Swal.fire(
      'Correcto',
      'Se ha finalizado la sesion de manera exitosa',
      'success'
    );
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuario');
    localStorage.removeItem('datos');
    localStorage.removeItem('permisos');
    this.router.navigate(['/login']);
  });
  }
}
