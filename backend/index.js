const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const gamesRoutes = require('./routes/games'); // Importa as rotas de jogos

const app = express();

// Middleware para parsear JSON no corpo da requisição
app.use(express.json());

// Habilitar CORS para todas as rotas
app.use(cors());

// Usar as rotas de autenticação
app.use('/auth', authRoutes);


app.use('/games', gamesRoutes); // Usa as rotas de jogos


// Iniciar o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
