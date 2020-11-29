import { Component, OnInit } from '@angular/core';
import { LoginService } from '../authentication/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {



  ngOnInit(): void {
  }

}
