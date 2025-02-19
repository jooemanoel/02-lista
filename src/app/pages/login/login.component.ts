import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Usuario } from 'src/app/shared/models/interfaces/usuario';
import { UsuarioComId } from 'src/app/shared/models/interfaces/usuarioComId';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  @Output() pageChange = new EventEmitter();
  id = '';
  usuario: Usuario = { nome: '', senha: '' };
  colunas: string[] = ['edit', 'nome', 'delete'];
  dataSource = new MatTableDataSource<UsuarioComId>([]);
  constructor(private firebase: FirebaseService) {}
  ngOnInit(): void {
    this.carregarUsuarios();
  }
  login() {
    console.log(this.usuario);
  }
  homeClick() {
    this.pageChange.emit(1);
  }
  async adicionar() {
    this.usuario.nome = this.usuario.nome.toUpperCase();
    if (this.id) {
      await this.firebase.editarUsuario(this.id, this.usuario);
    } else {
      await this.firebase.adicionarUsuario(this.usuario);
    }
    this.usuario = { nome: '', senha: '' };
    this.carregarUsuarios();
  }
  async carregarUsuarios() {
    const usuarios: UsuarioComId[] = await this.firebase.listarUsuarios();
    this.dataSource.data = usuarios;
  }
  async excluir(id: string) {
    await this.firebase.excluirUsuario(id);
    this.carregarUsuarios();
  }
  ativarEdicao(element: UsuarioComId) {
    this.id = element.id;
    this.usuario.nome = element.nome;
    this.usuario.senha = element.senha;
  }
}
