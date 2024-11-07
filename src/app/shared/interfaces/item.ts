export interface Item {
  comprado: boolean;
  name: string;
  essencial: boolean;
}

export const ELEMENT_DATA: Item[] = [
  { comprado: false, name: 'Arroz', essencial: true },
  { comprado: false, name: 'Feijão', essencial: true },
  { comprado: false, name: 'Macarrão', essencial: true },
  { comprado: false, name: 'Manteiga', essencial: true },
  { comprado: true, name: 'Sal', essencial: true },
  { comprado: false, name: 'Açúcar', essencial: true },
  { comprado: false, name: 'Café', essencial: true },
  { comprado: false, name: 'Leite', essencial: true },
  { comprado: false, name: 'Biscoito', essencial: false },
  { comprado: false, name: 'Suco', essencial: false },
];