const express = require('express');
const mdAuth = require('../middlewares/auth');
const app = express();
const Snippet = require('../models/snippet')

// Obtener todos los snippets de un usuario
app.get('/:idUsuario', (req, res) => {
    Snippet.find({ usuario: req.params.idUsuario })
        .exec(
            (err, snippets) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando snippets',
                        errors: err
                    })
                }
                Snippet.count({ usuario: req.params.idUsuario }, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        snippets,
                        totalSnippets: conteo
                    })

                })

            })
})

// Obtener un snippet por ID
app.get('/:idSnippet', mdAuth.verificaToken, (req, res) => {
    Snippet.findOne({ _id: req.params.idSnippet }, (err, snippetDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar snippet',
                errors: err
            })
        }
        res.status(200).json({
            ok: true,
            snippetDB,
            usuarioToken: req.usuario
        })
    })

})

// Crear un nuevo snippet
app.post('/', mdAuth.verificaToken, (req, res) => {
    var body = req.body;

    var snippet = new Snippet({
        nombreSnippet: body.nombreSnippet,
        tipo: body.tipo,
        contenido: body.contenido,
        usuario: req.usuario._id
    });

    snippet.save((err, snippetGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear snippet',
                errors: err
            })
        }
        res.status(201).json({
            ok: true,
            snippet: snippetGuardado,
            usuarioToken: req.usuario
        })

    })
})



// Actualizar Snippet
app.put('/:idSnippet', mdAuth.verificaToken, (req, res) => {

    var id = req.params.idSnippet;
    var body = req.body;

    Snippet.findById(id, (err, snippetEncontrado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar snippet',
                errors: err
            })
        }
        if (!snippetEncontrado) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el snippet con el id' + id + 'no existe',
                    errors: { message: 'No existe un snippet con ese ID' }
                })
            }
        }
        snippetEncontrado.nombreSnippet = body.nombreSnippet;
        snippetEncontrado.tipo = body.tipo;
        snippetEncontrado.contenido = body.contenido;
        snippetEncontrado.save((err, snippetGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar snippet',
                    errors: err
                })
            }
            res.status(200).json({
                ok: true,
                Snippet: snippetGuardado,
                usuarioToken: req.usuario
            })
        })
    })

});

// Eliminar un snippet
app.delete('/:idSnippet', mdAuth.verificaToken, (req, res) => {
    var id = req.params.idSnippet;

    Snippet.findByIdAndDelete(id, (err, snippetBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar snippet',
                errors: err
            })
        }
        if (!snippetBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un snippet con ID:' + id,
                errors: { message: 'No existe un snippet con ese ID' }
            })
        }
        res.status(200).json({
            ok: true,
            snippet: snippetBorrado,
            usuarioToken: req.usuario
        })
    })
})
module.exports = app;