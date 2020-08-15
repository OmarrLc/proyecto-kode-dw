const express = require('express');
const app = express();
const Proyecto = require('../models/proyecto');
const Snippet = require('../models/snippet')

app.get('/todo/:busqueda', (req, res) => {
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
            buscarProyectos(busqueda, regex),
            buscarSnippets(busqueda, regex)
        ])
        .then(respuestas => {
            res.status(200).json({
                ok: true,
                proyectos: respuestas[0],
                snippets: respuestas[1]
            });
        })
});

function buscarProyectos(busqueda, regex) {
    return new Promise((resolve, reject) => {

        Proyecto.find({ nombreProyecto: regex }, (err, proyectos) => {
            if (err) {
                reject('Error al buscar proyectos', err)
            }
            resolve(proyectos)
        });
    })
}

function buscarSnippets(busqueda, regex) {
    return new Promise((resolve, reject) => {

        Snippet.find({ nombreSnippet: regex }, (err, snippets) => {
            if (err) {
                reject('Error al buscar snippets', err)
            }
            resolve(snippets)
        });
    })
}
module.exports = app;