# MyPoliGame
p rodar localmente:

baixar node e npm

configurar db.js p corresponder a database q vc tem localmente (usa o software pg admin p criar uma database e uma tabela users). A database precisa de uma tabela chamada users com colunas username e password (ver auth.js) 

BAIXAR O ARQUIVO .env DO DRIVE. Lá eu botei minha api key e a chave jwt

P inicializar o front, no diretório raiz:

$ npm i

$ npm run dev

P inicializar o back: abrir outro terminal ai no diretório do backend: 

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

Pra rodar com docker:

Baixar docker desktop (https://docs.docker.com/desktop/setup/install/windows-install/);
Depois de instalado ativar "enable host networking" em Settings -> Resources -> Network;

Rodar `docker compose up --build --watch` na raiz do repositório;

Pra expor pro público usar tailscale que nem no outro método.

Para reiniciar db:
Parar container.
Usar `docker rm mypoligame-db` para remover container da db.
Rodar `docker compose up --build --watch` para construir o container de novo.











