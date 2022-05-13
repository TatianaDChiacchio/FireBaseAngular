import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AutorizacaoService } from '../services/autorizacao.service';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form:FormGroup;
  usuarioEstaLogado = this.autorizacao.obterStatusLogin()

  constructor(private fb:FormBuilder,
              private auth:AngularFireAuth,
              private autorizacao:AutorizacaoService,
              private router:Router) {

    this.form = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      senha: ['',[Validators.required, Validators.minLength(6)]]
    })
   }

  ngOnInit(): void {
  }

  fazerLogin(){

    this.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.senha)
    .then(user =>{
      console.log(user)
      this.autorizacao.autorizar()
      this.router.navigateByUrl('/func-adm')
    })
    .catch(error =>{
      this.autorizacao.deslogar()
      this.router.navigate(['/'])
    })
  }

  fazerLogout(){
    this.autorizacao.deslogar()
    this.usuarioEstaLogado = this.autorizacao.obterStatusLogin()
    this.auth.signOut().then(() => {
      console.log('Signout Succesfull')
      this.autorizacao.deslogar()
    }, function(error) {
      console.log('Signout Failed')
    });
  }

  googleSignout() {
    this.auth.signOut().then(() => {
      console.log('Signout Succesfull')
      this.autorizacao.deslogar()
      this.usuarioEstaLogado = this.autorizacao.obterStatusLogin()
    }, function(error) {
      console.log('Signout Failed')
    });
 }

  fazerLoginGoogle(){
    this.auth.signInWithPopup(new GoogleAuthProvider()).then((result) => {
      var user = result.user;
		  console.log(user)
      this.autorizacao.autorizar()
      this.router.navigateByUrl('/func-adm')
   }).catch(function(error) {
      console.log(error.code)
      console.log(error.message)
   });
  }
}
