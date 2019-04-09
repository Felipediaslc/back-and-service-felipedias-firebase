import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/app/compartilhado/funcionario.service'
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  constructor(private service : FuncionarioService, 
    private firestore:AngularFirestore,
    private toastr : ToastrService ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm) {
    if(form!= null)
     form.resetForm();
     this.service.formData = {
       id : null,
       nomeCompleto:'  ' ,
       posicao: '   ',
       empCode: '',
       telefone: '',
     }
  }
    
  onSubmit(form:NgForm){
    let data = Object.assign({},form.value);
    delete data.id;
    if(form.value.id==null)
      this.firestore.collection('funcionarios').add(data);
    else
      this.firestore.doc('funcionarios/'+ form.value.id).update(data)
    this.resetForm(form);
    this.toastr.success('Enviado com sucesso', 'Emp.DocFree Register');
  }

}
