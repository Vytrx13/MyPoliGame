// integração com a api para buscar por jogos

const express = require('express');

const router = express.Router();

router.post('/search', async (req, res) => {
    const { searchVal } = req.body;
    console.log(searchVal);
});










module.exports = router;