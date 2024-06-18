## Protótipo de Blockchain para Proteção de Dados Bancários

# Descrição do Projeto:

Este projeto é um protótipo de blockchain desenvolvido para abordar o problema de vazamento de dados bancários. A blockchain oferece uma solução robusta e segura para armazenar e gerenciar transações bancárias de maneira transparente e imutável.

## Tecnologias Utilizadas

- TypeScript: Linguagem de programação principal utilizada para desenvolvimento.
- Node.js: Ambiente de execução JavaScript no lado do servidor.
- Crypto: Biblioteca para operações criptográficas, incluindo hash e criptografia simétrica.

## Estrutura do Projeto

- index.ts: Ponto de entrada do aplicativo, inicializa a blockchain e define a função de criação de blocos.
- blockchain.ts: Implementação da classe Blockchain, responsável pela criação, mineração e verificação de blocos.
- transação.ts: Definição da interface Transação e funções relacionadas à criação de transações.
- crypto.ts: Funções de criptografia e descriptografia.
- helpers.ts: Funções auxiliares, como a validação do hash.
- menu.ts: Implementação de um menu interativo para interação com o usuário.

# Funcionalidades Atuais

- Criação de Blocos: Blocos podem ser criados com transações criptografadas.
- Mineração de Blocos: Implementação de Proof of Work (PoW) > pt-br = prova de trabalho para garantir a integridade dos blocos.
- Verificação de Blocos: Verifica a integridade dos blocos antes de adicioná-los à cadeia.
- Transações Criptografadas: Transações são criptografadas para garantir a privacidade dos dados.
- Exibição da Blockchain: Visualização dos blocos com detalhes das transações descriptografadas.

# Funcionalidades Futuras

- Verificação de Integridade: Método para verificar a integridade de toda a blockchain.
- Persistência dos Dados: Salvar e carregar a blockchain de um arquivo para persistência entre execuções.
- Melhorias na Interação do Menu: Opções adicionais para visualizar transações específicas e buscar por usuário.
- Simulação de Rede P2P: Simulação de uma rede peer-to-peer para múltiplos nós.
- Interface Gráfica: Desenvolvimento de uma interface gráfica usando Electron.
- Segurança Adicional: Implementação de assinaturas digitais para transações.
- Documentação e Testes: Comentários detalhados e uma suíte de testes automatizados.

Licença
Este projeto está licenciado sob a MIT License. (É mentira)
