import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {LoginService} from 'src/app/core/authentication/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  MyForm: FormGroup;
  constructor( private fb: FormBuilder,
               private apiService: LoginService,
               private router: Router) { }

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario(): void {
    this.MyForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  login(): void  {
    console.log(this.MyForm.value);
    this.apiService.login(this.MyForm.value)
    .subscribe(
        (result: any) => {
          console.log(result);
          localStorage.setItem('authToken', result.access_token);
          localStorage.setItem('usuario', JSON.stringify(result.usuario));
          localStorage.setItem('datos', JSON.stringify(result.funcionario));
          localStorage.setItem('permisos', JSON.stringify(result.permisos));
          this.router.navigate(['/sistema']);
        },
        error => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message,
          });
        }
    );
  }

}
