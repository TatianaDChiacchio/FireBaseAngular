import { CargoService } from './../../services/cargo.service';
import { Funcionario } from './../funcionario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario.service';
import { Cargo } from '../../cargo/cargo';



@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {

  funcionario: FormGroup = this.fb.group({
    nome: ['',[Validators.required, Validators.minLength(3)]],
    email: ['',[Validators.required, Validators.email]],
    cargo: ['',[Validators.required]],
    salario: [''],
    foto: ['']
  })

  id: string | undefined
  urlImagem:any = ""

  cargos:Cargo[]= []

  progress = 0

  constructor(private fb:FormBuilder,
              private funcService:FuncionarioService,
              private cargoService:CargoService) { }

  ngOnInit(): void {
    this.funcService.getFuncionarioEdit().subscribe(resultado =>{
      console.log(resultado)
      this.id = resultado.id
      this.urlImagem = resultado.foto
      this.funcionario.patchValue({
        nome: resultado.nome,
        email: resultado.email,
        cargo: resultado.cargo,
        salario: resultado.salario,

      })
    })
    this.trazerTodosCargos()
    this.funcService.emitirProgresso.subscribe(
      (status) =>{
        this.progress = status
      }
    )

  }

  salvarFuncionario(){
    if (this.id == undefined){
      // executar a função de cadastro
      this.addFuncionario()
    }else{
      // executar a função de edição
      this.editarFuncionario(this.id)
    }
  }
  addFuncionario(){
    const FUNCIONARIO: Funcionario ={
      nome: this.funcionario.value.nome,
      email: this.funcionario.value.email,
      cargo: this.funcionario.value.cargo,
      salario: this.funcionario.value.salario,
      foto: this.urlImagem
    }
    this.funcService.addFuncionario(FUNCIONARIO).then(() =>{
      console.log("Funcionário cadastrado")
      this.funcionario.reset()
    },error =>{
      console.log("Erro ao cadastrar o funcinário: " + error)
    })
  }

  editarFuncionario(id:string){
    const FUNCIONARIO: Funcionario ={
      nome: this.funcionario.value.nome,
      email: this.funcionario.value.email,
      cargo: this.funcionario.value.cargo,
      salario: this.funcionario.value.salario,
      foto: this.urlImagem
    }

    this.funcService.editarFuncionario(id,FUNCIONARIO).then(()=>{
      console.log("Funcionário Editado")
      this.funcionario.reset()
      this.id = undefined
    }, error =>{
      console.log("Erro ao editar um funcionário: " + error)
    })
  }

  carregarImagem(event:any){
    this.progress = 0
    let arquivo = event.target.files[0]
    let reader = new FileReader()

    reader.readAsDataURL(arquivo)
    reader.onloadend = () => {
      console.log(reader.result)
      this.funcService.subirImagem("funcionario" + Date.now(), reader.result).then(urlImagem => {
        console.log("estourlImagem")
        this.urlImagem = urlImagem
      })
    }

  }

  trazerTodosCargos(){
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
