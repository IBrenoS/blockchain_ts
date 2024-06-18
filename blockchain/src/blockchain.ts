import { decrypt, encrypt } from "./crypto";
import { hash, hashValidado } from "./helpers";
import { Transacao } from "./transacao";

// Define a estrutura de um bloco na blockchain
export interface Bloco {
  header: {
    nonce: number;
    hashBloco: string;
  };
  payload: {
    sequencia: number;
    timestamp: number;
    transacoes: string[]; // Transações criptografadas
    hashAnterior: string;
    transacoesDescriptografadas?: Transacao[]; //transações descriptografadas para exibição
  };
}

// Classe principal que representa a blockchain
export class Blockchain {
  #chain: Bloco[] = []; // Cadeia de blocos (blockchain)
  private prefixoPow = '0'; // Prefixo usado para validação de prova de trabalho

  constructor(private readonly dificuldade: number = 4) {
    // Inicializa a blockchain com um bloco gênesis
    this.#chain.push(this.criarBlocoGenesis());
  }

  // Cria o bloco gênesis (primeiro bloco da blockchain)
  private criarBlocoGenesis(): Bloco {
    const payload: Bloco['payload'] = {
      sequencia: 0, // Primeiro bloco na sequência
      timestamp: +new Date(), // Data e hora de criação
      transacoes: [], // Sem transações no bloco gênesis
      hashAnterior: '' // Não há bloco anterior
    };

    const hashBloco = hash(JSON.stringify(payload)); // Calcula o hash do bloco
    return {
      header: {
        nonce: 0,
        hashBloco: hashBloco
      },
      payload
    };
  }

  // Obtém o último bloco adicionado à blockchain
  private get ultimoBloco(): Bloco {
    return this.#chain.at(-1) as Bloco;
  }

  // Obtém o hash do último bloco
  private hashUltimoBloco() {
    return this.ultimoBloco.header.hashBloco;
  }

  // Cria um novo bloco com transações criptografadas
  criarBloco(transacoes: Transacao[]): Bloco['payload'] {
    const transacoesCriptografadas = transacoes.map(tx => encrypt(JSON.stringify(tx)));
    const transacoesDescriptografadas = transacoes; // Guardar as transações originais

    const novoBloco: Bloco['payload'] = {
      sequencia: this.ultimoBloco.payload.sequencia + 1,
      timestamp: +new Date(),
      transacoes: transacoesCriptografadas,
      hashAnterior: this.hashUltimoBloco(),
      transacoesDescriptografadas 
    };

    console.log(`Bloco #${novoBloco.sequencia} criado: ${JSON.stringify(novoBloco)}`);
    return novoBloco;
  }

  // Realiza a mineração de um bloco (prova de trabalho)
  minerarBloco(bloco: Bloco['payload']) {
    let nonce = 0;
    const inicio = +new Date();
    let hashBloco: string;

    while (true) {
      // Adiciona o nonce ao bloco candidato
      const candidatoBloco = {
        ...bloco,
        nonce
      };
      // Calcula o hash do bloco candidato
      hashBloco = hash(JSON.stringify(candidatoBloco));

      console.log(`Tentativa: ${nonce}, Hash: ${hashBloco}`);

      // Verifica se o hash atende à dificuldade de mineração
      if (hashValidado({
        hash: hashBloco,
        dificuldade: this.dificuldade,
        prefixo: this.prefixoPow
      })) {
        const final = +new Date();
        const hashReduzido = hashBloco.slice(0, 12);
        const tempoMineracao = (final - inicio) / 1000;

        console.log(`Bloco #${bloco.sequencia} minado em ${tempoMineracao}s. Hash ${hashReduzido} (${nonce} tentativas)`);

        // Retorna o bloco minerado com o nonce e o hash final
        return {
          blocoMinerado: {
            payload: { ...bloco },
            header: {
              nonce,
              hashBloco
            }
          }
        };
      }

      nonce++; // Incrementa o nonce para tentar um novo hash
    }
  }

  // Verifica se o bloco é válido (integridade do hash anterior)
  verificarBloco(bloco: Bloco): boolean {
    if (bloco.payload.hashAnterior !== this.hashUltimoBloco()) {
      console.log(`Bloco #${bloco.payload.sequencia} inválido: O hash anterior é ${this.hashUltimoBloco()} e não ${bloco.payload.hashAnterior}`);
      return false;
    }
    return true;
  }

  // Adiciona um bloco validado à blockchain
  enviarBloco(bloco: Bloco): Bloco[] {
    if (this.verificarBloco(bloco)) {
      this.#chain.push(bloco); // Adiciona o bloco à cadeia
      console.log(`Bloco #${bloco.payload.sequencia} foi adicionado à blockchain: ${JSON.stringify(bloco, null, 2)}`);
    }
    return this.#chain; // Retorna a cadeia atualizada
  }

  // Método público para obter a cadeia de blocos
  getChain(): Bloco[] {
    return this.#chain;
  }

  // Método para obter as transações de um bloco
  obterTransacoes(bloco: Bloco): Transacao[] {
    return bloco.payload.transacoes.map(tx => JSON.parse(decrypt(tx)));
  }
}
