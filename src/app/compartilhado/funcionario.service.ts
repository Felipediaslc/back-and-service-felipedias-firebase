import { Injectable } from '@angular/core';
import { Funcionario } from './funcionario.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
formData :Funcionario;


  constructor(private firestore:AngularFirestore) { }
     

  getFuncionarios(){
    return this.firestore.collection('funcionarios').snapshotChanges();
  }
}
