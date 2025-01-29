import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ListaService } from 'src/app/services/lista.service';
import { Lista } from 'src/app/shared/models/interfaces/lista';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
})
export class TabelaComponent implements OnInit {
  colunas: string[] = ['ver', 'nome', 'excluir'];
  dataSource = new MatTableDataSource<Lista>([]);
  constructor(private service: ListaService, private _router: Router) {
  }
  ngOnInit() {
    this.dataSource.data = this.service.listas;
  }
  criarLista() {
    void this._router.navigateByUrl('formulario');
  }
  ver(id: number) {
    this.service.id = id;
    void this._router.navigateByUrl('lista');
  }
  excluir(id: number) {
    this.service.excluirLista(id);
    this.dataSource.data = this.service.listas;
  }
}
