const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Todo bien'
    })
})

module.exports = app;