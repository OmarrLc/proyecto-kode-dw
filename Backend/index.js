const express = require('express');
const app = express();
const database = require('./modules/db');

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Todo bien'
    })
})

app.listen(8888, () => {
    console.log('Servidor levantado');
})