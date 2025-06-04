# Trabalho de react
Status
Node.js
MongoDB
Express
Descrição
Este projeto é uma API RESTful para uma plataforma de arrecadação de fundos (crowdfunding), desenvolvida com Node.js, Express, e MongoDB. A aplicação permite o gerenciamento de usuários (cadastro, login, listagem) e campanhas (criação, listagem, atualização, exclusão, e registro de doações), com suporte a upload de imagens para campanhas. Utiliza Mongoose para modelagem de dados, Multer para upload de arquivos, e CORS para integração com frontends. As imagens das campanhas são servidas a partir da pasta Uploads.
O objetivo é fornecer uma API robusta para sistemas de crowdfunding, ideal para integração com interfaces web ou móveis.
Funcionalidades
Gerenciamento de Usuários:
Cadastro de usuários com nome, e-mail, e senha.

Login de usuários com validação de e-mail e senha.

Listagem de todos os usuários (para fins de teste).

Gerenciamento de Campanhas:
Criação de campanhas com título, descrição, meta financeira, e imagem (opcional).

Listagem de todas as campanhas ou busca por ID.

Atualização de campanhas (incluindo nova imagem).

Exclusão de campanhas.

Registro de doações com valor e data, atualizando o total arrecadado.

Upload de imagens para campanhas, armazenadas na pasta Uploads.

Serviço de arquivos estáticos para acessar imagens em /uploads.

Validação de campos obrigatórios e unicidade de e-mail.

Timestamps automáticos para criação de usuários, campanhas, e doações.

Tecnologias Utilizadas
Node.js: Plataforma de execução do backend.

Express: Framework para criação da API RESTful.

MongoDB: Banco de dados NoSQL para armazenamento.

Mongoose: Biblioteca ODM para modelagem de dados.

Multer: Middleware para upload de arquivos.

CORS: Middleware para suportar requisições cross-origin.

npm: Gerenciador de pacotes.

Pré-requisitos
Node.js (versão 16.x ou superior)

MongoDB (versão 5.x ou superior, local ou MongoDB Atlas)

Git (para clonar o repositório)

Ferramenta para testar APIs (ex.: Postman ou cURL