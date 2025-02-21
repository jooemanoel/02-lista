import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Registro } from 'src/app/shared/models/interfaces/registro';
import { Usuario } from 'src/app/shared/models/interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  colecao = 'usuarios';
  hide = true;
  @Output() pageChange = new EventEmitter();
  usuario: Usuario = { nome: '', senha: '' };
  senha2 = '';
  registro = false;
  colunas: string[] = ['edit', 'nome', 'delete'];
  dataSource = new MatTableDataSource<Registro<Usuario>>([]);
  constructor(
    private firebase: FirebaseService,
    private _snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    this.carregarUsuarios();
  }
  login() {
    this.usuario.nome = this.usuario.nome.toUpperCase();
    const user = this.firebase.buscarUsuario(this.usuario);
    if (user === undefined) {
      this._snackBar.open('Usuário não encontrado.', '', { duration: 5000 });
    } else if (!user) {
      this._snackBar.open('Senha incorreta.', '', { duration: 5000 });
    } else {
      this.firebase.usuarioAtual = user;
      localStorage.setItem('usuarioAtual', JSON.stringify(user));
      this.pageChange.emit(1);
    }
  }
  homeClick() {
    this.pageChange.emit(1);
  }
  async adicionar() {
    if (!this.registro) {
      this.registro = true;
      return;
    }
    if (this.usuario.senha !== this.senha2) {
      this._snackBar.open('As senhas devem ser iguais.', '', {
        duration: 5000,
      });
      return;
    }
    this.usuario.nome = this.usuario.nome.toUpperCase();
    if (this.firebase.usuarios.find((x) => x.data.nome === this.usuario.nome)) {
      this._snackBar.open('Este usuário já existe.', '', {
        duration: 5000,
      });
      return;
    }
    const idUser = await this.firebase.adicionar<Usuario>(
      this.colecao,
      this.usuario,
    );
    this.usuario = { nome: '', senha: '' };
    this.senha2 = '';
    if (idUser) {
      this._snackBar.open('Cadastro realizado com sucesso.', '', {
        duration: 5000,
      });
      this.registro = false;
      this.carregarUsuarios();
    } else {
      this._snackBar.open('Houve um erro no cadastro.', '', {
        duration: 5000,
      });
    }
  }
  async carregarUsuarios() {
    const usuarios: Registro<Usuario>[] = await this.firebase.listar<Usuario>(
      this.colecao,
    );
    this.firebase.usuarios = usuarios;
    this.dataSource.data = usuarios;
  }
  acessar(element: Registro<Usuario>) {
    this.firebase.usuarioAtual = element;
    this.pageChange.emit(1);
  }
}
