# CRUD_user_typescript_jwt_joi_typeorm
Projeto base em Node.js construído com Typescript, JWT, TypeORM e Joi. Consiste basicamente em um CRUD de usuário e atutenticação com uso de token em rotas específicas.

## Requisitos
- [Node.js] - Versão 10 ou superior;
- [Postman] - OPCIONAL. Caso deseje fazer requisições à api através de um client http, pode-se usar o Postman;

## Instalação 
Após clonar o projeto (`git clone https://github.com/welingtonfidelis/CRUD_user_typescript_jwt_joi_typeorm.git`), é preciso incluir alguns valores nas variáveis de ambiente. Para isso, crie um arquivo nomeado de **.env** no diretório do projeto e preencha o arquivo com as informações do arquivo **.env.example** na raiz do projeto.

Em seu terminal de comandos no diretório do projeto, execute o comando `npm install` para que sejam instaladas as dependências do projeto

## Utilização
Ainda em seu terminal de comandos, execute `npm start` para que o servidor entre em modo de execução e exponha as rotas para utilização.
Você pode utilizar aplicativos do tipo cliente HTTP para acessar as rotas disponíveis. Um exemplo destes aplicativos clientes é o [Postman]. Caso deseje importar o arquivo de exemplo para uso das rotas, [clique aqui] para abrir uma coleção no seu [Postman].

[Joi]: <https://joi.dev/api/>
[Node.js]: <https://nodejs.org/en/>
[Postman]: <https://www.postman.com/downloads/>
[clique aqui]: <https://www.getpostman.com/collections/a2d4e9ff28cff82a05f8>