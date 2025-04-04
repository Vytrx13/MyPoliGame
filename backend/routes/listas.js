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
        return -1;
    }
}

router.post('/add', async (req, res) => {
    const { user, selectedList, gameId, gameName, imageUrl, score } = req.body;
    console.log(user, selectedList, gameId, gameName, imageUrl, score);
    const registro_id = await getRegistroId(user, gameId); // retorna zero se n existe
    console.log(registro_id);
    if (registro_id > 0) {
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

router.post('/check-game-in-list', async (req, res) => {
    const { user, gameId } = req.body;
    
    if (!user || !gameId) {
        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    console.log("Verificando se já está na lista,", user, gameId);
    
    try {
        const registro_id = await getRegistroId(user, gameId); // retorna zero se não existe
        console.log("registro_id", registro_id);
        if (registro_id > 0) {
            console.log("ta na lista")
            const result = await pool.query("SELECT tipo, rating, id FROM registro_lista WHERE id = $1", [registro_id]);
            console.log(result.rows[0]);
            const tipo = result.rows[0].tipo;
            const rating = result.rows[0].rating;
            const id = result.rows[0].id;
            res.json({tipo , rating, id}); // tetar se funfa
        }
        else {
            console.log("n ta na lista");
        }
    } catch (err) {
        console.error("Erro ao verificar lista:", err);
        res.status(500).json({ error: 'Erro ao verificar lista' });
    }
});

router.post('/remove', async (req, res) => {
    const { user, gameId } = req.body;

    console.log("tentando remover", user, gameId);
    
    if (!user || !gameId) {
        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    try {
        await pool.query('DELETE FROM registro_lista WHERE username = $1 AND jogo_id = $2', [user, gameId]);
        console.log("removido!");
        res.status(200).send("deu bom!");

    } catch (err) {
        res.status(500).json({ error: 'Erro ao remover jogo da lista' });
    }


});

router.post('/get-games-from-list', async (req, res) => {
    const { user } = req.body;

    console.log("Pegando jogos da lista do usuario: ", user);
    
    if (!user) {
        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    try {
        const result = await pool.query('SELECT tipo, jogo_id, nome_jogo, url_imagem, rating FROM registro_lista WHERE username = $1 ORDER BY nome_jogo', [user]);
        console.log(result.rows);
        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: 'Erro ao remover jogo da lista' });
    }


});

module.exports = router;