import produtos from 'src/app/shared/models/json/produtos.json';
export const ITENS_BASICOS: Item[] = produtos;

export interface Item {
  selecionado: boolean;
  name: string;
  categoria: string;
}
