const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('conexion');
    res.end();
})

module.exports = app;