import { CargoService } from './../../services/cargo.service';
import { Component, OnInit } from '@angular/core';
import { Cargo } from '../cargo';

@Component({
  selector: 'app-cargo-lista',
  templateUrl: './cargo-lista.component.html',
  styleUrls: ['./cargo-lista.component.css']
})
export class CargoListaComponent implements OnInit {

  cargos:Cargo[] = []
  columns:string[] =['nome','descricao','salarioBase']
  carregando = false

  constructor(private cargoService:CargoService) { }

  ngOnInit(): void {
    this.listarCargos()
  }

  listarCargos(){
    this.cargoService.listarCargos().subscribe(doc =>{
      this.cargos =[]
      doc.forEach((element:any) => {
        this.cargos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

}
