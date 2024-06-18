export interface Transacao {
  de: string;
  para: string;
  quantidade: number;
}

export function criarTransacao(de: string, para: string, quantidade: number): Transacao {
  return { de, para, quantidade };
}
