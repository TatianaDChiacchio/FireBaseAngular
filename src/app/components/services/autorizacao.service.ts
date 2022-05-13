import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {

  autorizacao = false
  constructor() { }

  autorizar(){
    localStorage.setItem('login', "sim")
  }

  deslogar(){
    localStorage.clear()
  }

  obterStatusLogin = ()=> !!localStorage.getItem('login')
}
