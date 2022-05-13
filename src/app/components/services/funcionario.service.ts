import { Injectable,EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'

import { environment } from 'src/environments/environment';

import { Funcionario } from '../funcionario/funcionario';



firebase.initializeApp(environment.firebase)


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  emitirProgresso = new EventEmitter();

  // o subject é um tipo especial de Observable
  //permite enviar e receber dados
  private funcionarioEdit = new Subject<any>()

  storageRef = firebase.app().storage().ref()


  constructor(private fireAngular:AngularFirestore) { }

  listarFuncionarios():Observable<any>{
    return this.fireAngular.collection('funcionario',ref => ref.orderBy('nome')).snapshotChanges();
  }

  addFuncionario(funcionario: Funcionario):Promise<any>{
    return this.fireAngular.collection('funcionario').add(funcionario)
  }

  excluirFuncionario(id: string):Promise<any>{
    return this.fireAngular.collection('funcionario').doc(id).delete()
  }

  // o next colocar os dados do funcionário escolhido dentro do subject
  pegarDadosDoFuncionarioEscolhido(funcionario:Funcionario){
    this.funcionarioEdit.next(funcionario)
  }

  // nesse método é retornado os dados que estão no subject
  getFuncionarioEdit():Observable<Funcionario>{
    return this.funcionarioEdit.asObservable()
  }

  editarFuncionario(id: string, funcionario:Funcionario):Promise<any>{
    return this.fireAngular.collection('funcionario').doc(id).update(funcionario)
  }

  // a função putString faz a convesão do arquivo imgBase64 para blob
  async subirImagem(nome: string, imgBase64:any){

    const storage = firebase.storage()
    try{
      let resultado = await this.storageRef.child("imgFoto/" + nome).putString(imgBase64,'data_url')
      console.log("aqui" + resultado)
      this.emitirProgresso.emit((resultado.bytesTransferred/resultado.totalBytes)*100)

      return await resultado.ref.getDownloadURL()
    }catch(err){
      console.log(err)
      return null
    }
  }
}
