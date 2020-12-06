import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../authentication/login.service';

@Injectable({
  providedIn: 'root'
})
export class LogueoService implements CanActivate {

  constructor(private router: Router, private token: LoginService) { }

  authToken = this.token.getToken();

  canActivate(): boolean {
    console.log(this.authToken);
    if (this.authToken) { return true;  }
    else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
