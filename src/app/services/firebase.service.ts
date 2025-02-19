// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB6D-EiO-Bi6wb7fePa-FLnIE3NqY62BjM',
  authDomain: 'testebd-80d9e.firebaseapp.com',
  databaseURL: 'https://testebd-80d9e.firebaseio.com',
  projectId: 'testebd-80d9e',
  storageBucket: 'testebd-80d9e.firebasestorage.app',
  messagingSenderId: '33530023257',
  appId: '1:33530023257:web:d9c421b634ce9e510c5048',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import { Injectable } from '@angular/core';
import { Usuario } from '../shared/models/interfaces/usuario';
import { UsuarioComId } from '../shared/models/interfaces/usuarioComId';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  usuarios: UsuarioComId[] = [];
  async listarUsuarios(): Promise<UsuarioComId[]> {
    this.usuarios = [];

    const usuariosRef = collection(db, 'usuarios');
    const snapshot = await getDocs(usuariosRef);

    snapshot.forEach((doc) => {
      const usuario: UsuarioComId = doc.data() as UsuarioComId;
      usuario.id = doc.id;
      this.usuarios = [...this.usuarios, usuario];
    });
    console.log(this.usuarios);
    return this.usuarios;
  }
  async adicionarUsuario(usuario: Usuario): Promise<void> {
    try {
      const docRef = await addDoc(collection(db, 'usuarios'), usuario);
      console.log('Usuário adicionado com ID:', docRef.id);
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  }
  async excluirUsuario(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'usuarios', id));
      console.log(`Usuário com ID ${id} excluído com sucesso.`);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  }
  async editarUsuario(
    id: string,
    novosDados: Partial<{ nome: string; apelido: string }>,
  ): Promise<void> {
    try {
      const usuarioRef = doc(db, 'usuarios', id);
      await updateDoc(usuarioRef, novosDados);
      console.log(`Usuário com ID ${id} atualizado com sucesso.`);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  }
}
