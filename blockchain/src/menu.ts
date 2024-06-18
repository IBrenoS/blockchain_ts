import readline from 'readline';
import { Blockchain } from './blockchain';
import { criarTransacao, Transacao } from './transacao';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function menu(blockchain: Blockchain) {
  function exibirMenu() {
    console.log('\nEscolha uma opção:');
    console.log('1. Criar transação');
    console.log('2. Visualizar blockchain');
    console.log('3. Sair');
  }

  function criarTransacaoMenu() {
    rl.question('\nDe: ', (de) => {
      rl.question('Para: ', (para) => {
        rl.question('Quantidade: ', (quantidade) => {
          const transacao = criarTransacao(de, para, parseFloat(quantidade));
          const blocoPayload = blockchain.criarBloco([transacao]);
          const { blocoMinerado } = blockchain.minerarBloco(blocoPayload);
          blockchain.enviarBloco(blocoMinerado);

          console.log('Transação criada e bloco minerado:');
          console.log(JSON.stringify(blocoMinerado, null, 2));
          exibirMenu();
          menuPrompt();
        });
      });
    });
  }

  function visualizarBlockchain() {
    const chain = blockchain.getChain();
    console.log('\n--- BLOCKCHAIN ---');
    chain.forEach((bloco) => {
      console.log(`Bloco #${bloco.payload.sequencia}`);
      console.log(`Timestamp: ${new Date(bloco.payload.timestamp).toLocaleString()}`);
      console.log(`Hash do Bloco: ${bloco.header.hashBloco}`);
      console.log(`Hash Anterior: ${bloco.payload.hashAnterior}`);
      console.log('Transações:');
      bloco.payload.transacoesDescriptografadas?.forEach((tx, index) => {
        console.log(`  Transação ${index + 1}: De ${tx.de} para ${tx.para}, Quantia: ${tx.quantidade}`);
      });
      console.log('---');
    });
    exibirMenu();
    menuPrompt();
  }

  function sair() {
    rl.close();
  }

  function menuPrompt() {
    rl.question('\nOpção: ', (opcao) => {
      switch (opcao) {
        case '1':
          criarTransacaoMenu();
          break;
        case '2':
          visualizarBlockchain();
          break;
        case '3':
          sair();
          break;
        default:
          console.log('Opção inválida!');
          exibirMenu();
          menuPrompt();
      }
    });
  }

  exibirMenu();
  menuPrompt();
}
