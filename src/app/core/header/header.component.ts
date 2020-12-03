import { Component, OnInit } from '@angular/core';
import { LoginService } from '../authentication/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private token: LoginService){}
  usuario;
  ngOnInit(): void {
    this.usuario = this.token.getUsuario().usuario;

  }

}
