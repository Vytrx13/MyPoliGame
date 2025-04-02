# MyPoliGame
p rodar localmente:

baixar node e npm

configurar db.js p corresponder a database q vc tem localmente (usa o software pg admin p criar uma database e uma tabela users). A database precisa de uma tabela chamada users com colunas username e password (ver auth.js) 

arranjar sua propria api key em https://www.giantbomb.com/api/ e botar em um arquivo .env no diretorio do backend ou se quiser usar minha chave, baixar o arquivo .env no drive

no diretório raiz:

$ npm i

$ npm run dev

abrir outro terminal ai no diretório do backend:

$ npm i

$ node index.js

Usando Tailscale

tailscale funnel 5173

npm run dev -- --host 127.0.0.1

queries q usei p criar tabelas

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE registro_lista (
id SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL,
tipo VARCHAR(20) NOT NULL,
jogo_id INT NOT NULL,
nome_jogo TEXT NOT NULL,
url_imagem TEXT,
rating INT
);






