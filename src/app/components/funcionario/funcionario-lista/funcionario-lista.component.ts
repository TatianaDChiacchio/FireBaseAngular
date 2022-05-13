
import { Component, ViewChild } from '@angular/core';

import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../funcionario';

import { AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';



@Component({
  selector: 'app-funcionario-lista',
  templateUrl: './funcionario-lista.component.html',
  styleUrls: ['./funcionario-lista.component.css']
})
export class FuncionarioListaComponent implements AfterViewInit {

  funcionarios:Funcionario[] = []

  displayedColumns: string[] = ['nome', 'email', 'cargo', 'salario', 'acoes'];

  dataSource = new MatTableDataSource<Funcionario>(this.funcionarios);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private funcService:FuncionarioService,
    private _liveAnnouncer: LiveAnnouncer) { }

  ngAfterViewInit() {

    this.mostrarFuncionarios()

  }


  mostrarFuncionarios():void{

    this.funcService.listarFuncionarios().subscribe(doc =>{
      console.log(doc)
      this.funcionarios = []
      doc.forEach((element:any) => {
        this.funcionarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()})
          this.dataSource = new MatTableDataSource<Funcionario>(this.funcionarios);
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort;
      });


    })
    console.log("estou aqui" + this.funcionarios)

    console.log("agora aqui" + this.dataSource)

  }

  excluirFuncionario(id:string){
    this.funcService.excluirFuncionario(id).then(() =>{
      console.log("Funcionário excluído")
    }, error =>{
      console.log("Erro ao excluir um funcionario" + error)
    })

  }

  editarFuncionario(funcionario:Funcionario){
    this.funcService.pegarDadosDoFuncionarioEscolhido(funcionario)
  }

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
