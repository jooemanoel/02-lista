export interface Item {
  selecionado: boolean;
  name: string;
  categoria: string;
}

export const ITENS_BASICOS: Item[] = [
  { selecionado: false, name: 'Arroz', categoria: 'alimentos' },
  { selecionado: false, name: 'Feijão', categoria: 'alimentos' },
  { selecionado: false, name: 'Macarrão', categoria: 'alimentos' },
  { selecionado: false, name: 'Manteiga', categoria: 'alimentos' },
  { selecionado: false, name: 'Sal', categoria: 'alimentos' },
  { selecionado: false, name: 'Açúcar', categoria: 'alimentos' },
  { selecionado: false, name: 'Café', categoria: 'alimentos' },
  { selecionado: false, name: 'Leite', categoria: 'alimentos' },
  { selecionado: false, name: 'Biscoito', categoria: 'alimentos' },
  { selecionado: false, name: 'Suco', categoria: 'alimentos' },
  { selecionado: false, name: 'Sabão em Pó', categoria: 'limpeza' },
  { selecionado: false, name: 'Amaciante de roupas', categoria: 'limpeza' },
  { selecionado: false, name: 'Detergente', categoria: 'limpeza' },
  { selecionado: false, name: 'Pinho', categoria: 'limpeza' },
  { selecionado: false, name: 'Pano de chão', categoria: 'limpeza' },
  { selecionado: false, name: 'Esponja', categoria: 'limpeza' },
  { selecionado: false, name: 'Sabonete', categoria: 'higiene' },
  { selecionado: false, name: 'Shampoo', categoria: 'higiene' },
  { selecionado: false, name: 'Condicionador', categoria: 'higiene' },
  { selecionado: false, name: 'Creme dental', categoria: 'higiene' },
  { selecionado: false, name: 'Escova de dentes', categoria: 'higiene' },
  { selecionado: false, name: 'Desodorante', categoria: 'higiene' },
  { selecionado: false, name: 'Barbeador', categoria: 'higiene' },
  { selecionado: false, name: 'Sabonete líquido', categoria: 'higiene' },
];