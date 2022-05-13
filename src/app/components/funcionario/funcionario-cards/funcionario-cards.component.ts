import { FuncionarioService } from './../../services/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../funcionario';

@Component({
  selector: 'app-funcionario-cards',
  templateUrl: './funcionario-cards.component.html',
  styleUrls: ['./funcionario-cards.component.css']
})
export class FuncionarioCardsComponent implements OnInit {

  funcionarios: Funcionario[] = []

  constructor(private funcService:FuncionarioService) { }

  ngOnInit(): void {
    this.mostrarFuncionarios()
  }

  mostrarFuncionarios(){

    this.funcService.listarFuncionarios().subscribe(doc =>{
     console.log(doc)
     this.funcionarios = []
     doc.forEach((element:any) => {
       this.funcionarios.push({
         id: element.payload.doc.id,
         ...element.payload.doc.data()})
       });
    })
    console.log(this.funcionarios)
  }

}
