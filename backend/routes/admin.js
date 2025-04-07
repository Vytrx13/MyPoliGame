const pool = require('../db');
const express = require('express');

const router = express.Router();

router.get('/get-tables' , async (req,res) => {
    console.log("/get-tables");

    try {
        const usuarios = await pool.query("SELECT * FROM users ORDER BY username");
        const registros = await pool.query("SELECT * FROM registro_lista ORDER BY username");

        res.json({usuarios: usuarios.rows, registros: registros.rows});
    }
    catch (err) {
        console.error("Erro ao pegar tabelas:", err);
        res.status(500).json({ error: 'Erro ao pegar tabelas' });
    }
})

router.post('/delete-user', async (req, res) => {
    const { username } = req.body;

    console.log("tentando deletar usuario", username);

    if (!username) {
        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    try {
        await pool.query('DELETE FROM users WHERE username = $1', [username]);
        console.log("usuario deletado!");
        res.status(200).send("deu bom!");

    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar usuario' });
    }


});

router.post('/delete-registro', async (req, res) => {
    const { id } = req.body;

    console.log("tentando deletar registro com id", id);

    if (!id) {
        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    try {
        await pool.query('DELETE FROM registro_lista WHERE id = $1', [id]);
        console.log("registro deletado!");
        res.status(200).send("deu bom!");

    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar registro' });
    }


});
module.exports = router;