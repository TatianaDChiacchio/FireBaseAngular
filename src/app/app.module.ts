import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt'

import { environment } from '../environments/environment';

import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { FuncionarioListaComponent } from './components/funcionario/funcionario-lista/funcionario-lista.component';
import { FuncionarioAdmComponent } from './components/funcionario/funcionario-adm/funcionario-adm.component';
import { FuncionarioCardsComponent } from './components/funcionario/funcionario-cards/funcionario-cards.component';
import { FuncionarioFormComponent } from './components/funcionario/funcionario-form/funcionario-form.component';
import { HomeComponent } from './components/templates/home/home.component';
import { registerLocaleData } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { CargoListaComponent } from './components/cargo/cargo-lista/cargo-lista.component';


registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    FuncionarioListaComponent,
    MainNavComponent,
    FuncionarioAdmComponent,
    FuncionarioCardsComponent,
    FuncionarioFormComponent,
    HomeComponent,
    LoginComponent,
    CargoListaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    LayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule

  ],
  providers: [ AngularFireAuth,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
