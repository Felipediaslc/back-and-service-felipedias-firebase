import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/app/compartilhado/funcionario.service';
import { Funcionario } from 'src/app/compartilhado/funcionario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-funcionario-lista',
  templateUrl: './funcionario-lista.component.html',
  styleUrls: ['./funcionario-lista.component.css']
})
export class FuncionarioListaComponent implements OnInit {
   
  list: Funcionario[];
  constructor( private service:FuncionarioService,
    private firestore: AngularFirestore,
    private toastr:ToastrService){ }

  ngOnInit() {
    this.service.getFuncionarios().subscribe(actionArray =>{
       this.list = actionArray.map(item =>{
         return {
           id: item.payload.doc.id,
           ...item.payload.doc.data()
          } as Funcionario;
       })
    });
  }

  onEdit(emp:Funcionario){
    this.service.formData =Object.assign({},emp);
  }
  onDelete(id:string){
    if(confirm("Tem certeza de excluir este registro?")){
     this.firestore.doc('funcionarios/'+id).delete();
     this.toastr.warning('Excluir com sucesso','Emp.DocFree Register');
    }
  }
}
