const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware para parsear JSON no corpo da requisição
app.use(express.json());

// Habilitar CORS para todas as rotas
app.use(cors());

// Usar as rotas de autenticação
app.use('/auth', authRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
