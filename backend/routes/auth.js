const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config();

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 9; // botei 9 da minha cabeça msm

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Rota de registro
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        // console.log("!username || !password")
        return res.status(501).send('Preencher os campos usuário e senha!');

    }
    console.log(req.body)
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
        res.json({ token });

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

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (!user) {
            return res.status(400).send('Usuário não encontrado');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        // a senha digitada é hasheada tbm ai dps é comparado

        if (passwordMatch) {
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
            res.json({ token });
        } else {
            res.status(401).send('Senha inválida');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao processar login');
    }
});





function obterUsernameDoToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        return decoded.username; // Supondo que o payload contenha a propriedade 'username'
    } catch (err) {
        console.error('Erro ao verificar o token:', err);
        return null;
    }
}

router.post('/verify-token', async (req, res) => {
    const { token } = req.body;
    const username = obterUsernameDoToken(token);
    console.log('Username extraído do token:', username);
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (!user) {
            console.log("!user");
            return res.status(400).send('Usuário não encontrado');

        }
        else res.json({username});
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao processar login');
    }   
});


module.exports = router;

