const pool = require('../db');
const express = require('express');

const router = express.Router();

async function getRegistroId(username, gameId) {
    try {
        const result = await pool.query('SELECT * FROM registro_lista WHERE username = $1 AND jogo_id = $2', [username, gameId]);
        // console.log(result.rows[0]);
        if (result.rows[0] !== undefined)
            return result.rows[0].id;
        return 0; 
    } catch (err) {
        console.error(err);
    }
}

router.post('/add', async (req, res) => {
    const {user, selectedList, gameId, gameName, imageUrl, score} = req.body;
    console.log(user, selectedList, gameId, gameName, imageUrl, score);
    const registro_id = await getRegistroId(user, gameId); // retorna zero se n existe
    console.log(registro_id);
    if (registro_id !== 0) {
        try {
        await pool.query("UPDATE registro_lista SET tipo = $1, rating = $2 WHERE id = $3", [selectedList, score, registro_id]);
        res.status(201).json({ message: 'Lista atualizada com sucesso!' });
        } catch (err) {
            console.error('Erro ao adicionar jogo:', err);
            res.status(500).json({ error: 'Erro ao atualizar lista' });
        }
    }
    else {
        try {
            const query = 'INSERT INTO registro_lista (username, tipo, jogo_id, nome_jogo, url_imagem, rating) VALUES ($1, $2, $3, $4, $5, $6)';
            const values = [user, selectedList, gameId, gameName, imageUrl, score];
            await pool.query(query, values);
            res.status(201).json({ message: 'Jogo adicionado com sucesso!' });
        } catch (err) {
            console.error('Erro ao adicionar jogo:', err);
            res.status(500).json({ error: 'Erro ao adicionar jogo' });
        }
    }

})


module.exports = router;