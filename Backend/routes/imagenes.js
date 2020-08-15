const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.get('/:img', (req, res) => {
    var img = req.params.img;
    var pathImagen = path.resolve(__dirname, `../archivosUploads/usuarios/${img}`)
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen)
    } else {
        var pathNoImage = path.resolve(__dirname, '../assets/no-img.jpg');
        res.sendFile(pathNoImage)
    }

})

module.exports = app;