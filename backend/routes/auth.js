const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();
const JWT_SECRET = 'segredo_muito_secreto'; 

// Rota de registro
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        console.log("!username || !password")
        return res.status(501).send('Preencher os campos usuário e senha!');
        
    } 
    console.log(req.body)
    try {
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
        res.status(201).send('Usuário registrado com sucesso!');
    } catch (err) {
        // console.error(err);
        // console.log(err.code)
        if (err.code === '23505')
            res.status(502).send('Erro ao registrar usuário');
        else
            res.status(500).send("erro generico")
        
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    console.log("vou tentar login")
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (!user) {
            console.log("!user");
            return res.status(400).send('Usuário não encontrado');

        }
        if (password === user.password) {
            console.log("senha certa");
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
            res.json({ token });
        } else {
            console.log("senha errada");
            res.status(401).send('Senha inválida');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao processar login');
    }
});

module.exports = router;
