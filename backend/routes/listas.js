const pool = require('../db');
const express = require('express');

const router = express.Router();


router.post('/add', async (req, res) => {
    const {user, selectedList, gameId, gameName, imageUrl, score} = req.body;
    console.log(user, selectedList, gameId, gameName, imageUrl, score);

    try {
        const query = 'INSERT INTO registro_lista (username, tipo, jogo_id, nome_jogo, url_imagem, rating) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [user, selectedList, gameId, gameName, imageUrl, score];
        await pool.query(query, values);
        res.status(201).json({ message: 'Jogo adicionado com sucesso!' });
    } catch (err) {
        console.error('Erro ao adicionar jogo:', err);
        res.status(500).json({ error: 'Erro ao adicionar jogo' });
    }


})


module.exports = router;