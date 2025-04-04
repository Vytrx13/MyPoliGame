// integração com a api para buscar por jogos

const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit'); // Importa o rate limiter
require('dotenv').config();
const router = express.Router();

// Configuração do Rate Limiter
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 100, // Máximo de 30 requisições por IP
    message: "Limite de requisições atingido. Tente novamente mais tarde.",
    headers: true, // Retorna headers informando o limite
});

// Aplica o rate limiter apenas nesta rota
router.use('/search', limiter);

router.use('/game-selected', limiter);

const api_key = process.env.API_KEY; // Certifique-se de definir sua chave de API nas variáveis de ambiente

router.post('/search', async (req, res) => {
    const { searchVal } = req.body;
    console.log("searchVal: ", searchVal)

    if (!searchVal) {
        return res.status(400).json({ error: 'O valor de pesquisa é obrigatório.' });
    }

    const url = `https://www.giantbomb.com/api/search/?api_key=${api_key}&format=json&query="${encodeURIComponent(searchVal)}"&resources=game`;
    console.log(url)
    try {
        const response = await axios.get(url);
        const games = response.data.results;

        if (games.length === 0) {
            return res.status(404).json({ message: 'Nenhum jogo encontrado.' });
        }
        console.log(games[0].name); 
        res.json(games);
    } catch (error) {
        console.error('Erro ao buscar dados da API externa:', error.message);
        res.status(500).json({ error: 'Erro ao buscar dados da API externa.' });
    }
});

router.post('/game-selected', async (req, res) => {
    const { gameId } = req.body;
    console.log("gameID:", gameId);

    const game_url = "https://www.giantbomb.com/api/game/"+gameId+"/?api_key="+api_key+"&format=json";
    console.log('game_url: ', game_url);
    try {
        const response = await axios.get(game_url);
        const gameData = response.data.results;

        if (gameData.length === 0) {
            return res.status(404).json({ message: 'Nenhum jogo encontrado.' });
        }
        // console.log(gameData.name); 
        res.json(gameData);

    } catch (error) {
        console.error('Erro ao buscar dados da API externa:', error.message);
        res.status(500).json({ error: 'Erro ao buscar dados da API externa.' });
    }


});

module.exports = router;
