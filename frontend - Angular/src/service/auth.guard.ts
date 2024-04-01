import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { ClientService } from 'src/service/client.service';
import { VeterinarioService } from './veterinario.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private clienteService: ClientService, private veterinarioService: VeterinarioService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.clienteService.isUserLoggedIn() || this.veterinarioService.isUserLoggedIn() ) {
      return true;
    }
    else {
      this.router.navigate(['/acesso-negado'])
      return false;
    }

  }

}
