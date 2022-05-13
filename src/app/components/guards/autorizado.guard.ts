import { AutorizacaoService } from './../services/autorizacao.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoGuard implements CanActivate {

  constructor(private autorizado:AutorizacaoService,
              private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const usuarioLogado = this.autorizado.obterStatusLogin()

    if (usuarioLogado) return usuarioLogado

    this.router.navigate(['/'])
    return true;
  }

}
