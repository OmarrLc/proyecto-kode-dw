const express = require('express');
const mdAuth = require('../middlewares/auth');
const app = express();
const Snippet = require('../models/snippet')
const Proyecto = require('../models/proyecto')
const fs = require('fs');
const path = require('path');

app.get('/:idSnippet/snippet', mdAuth.verificaToken, (req, res) => {
    Snippet.findOne({ _id: req.params.idSnippet }, (err, snippetDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al Descargr snippet',
                errors: err
            })
        }

        fs.writeFile(`./Snippets/${snippetDB.nombreSnippet}.${snippetDB.tipo}`, snippetDB.contenido, (err) => {
            if (err)
                throw (err)
            else
                console.log('Archivo creado exitosamente')

        });
        res.status(200).json({
            ok: true
        })
    })

})

app.get('/:idProyecto/proyecto', mdAuth.verificaToken, (req, res) => {
    Proyecto.findOne({ _id: req.params.idProyecto }, (err, proyectoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al Descargar proyecto',
                errors: err
            })
        }
        pahtCarpeta = `./Proyectos/${proyectoDB.nombreProyecto}`

        !fs.existsSync(pahtCarpeta) && fs.mkdirSync(pahtCarpeta);

        fs.writeFile(pahtCarpeta + `/index.html`, proyectoDB.index, (err) => {
            if (err)
                throw (err)
            else
                console.log('Archivo creado exitosamente')
        });
        fs.writeFile(pahtCarpeta + `/style.css`, proyectoDB.style, (err) => {
            if (err)
                throw (err)
            else
                console.log('Archivo creado exitosamente')
        });
        fs.writeFile(pahtCarpeta + `/main.js`, proyectoDB.main, (err) => {
            if (err)
                throw (err)
            else
                console.log('Archivo creado exitosamente')
        });


        res.status(200).json({
            ok: true
        })
    })

})



module.exports = app;