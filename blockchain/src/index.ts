import { Blockchain } from './blockchain';
import { menu } from './menu';

const dificuldade = 4;
const blockchain = new Blockchain(dificuldade);

console.log('Bem-vindo ao protótipo de blockchain!');


menu(blockchain);
