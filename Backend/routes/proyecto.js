const express = require('express');
const mdAuth = require('../middlewares/auth');
const app = express();
const Proyecto = require('../models/proyecto')

// Obtener todos los proyectos de un usuario
app.get('/:idUsuario', (req, res) => {
    Proyecto.find({ usuario: req.params.idUsuario })
        .exec(
            (err, proyectos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando proyectos',
                        errors: err
                    })
                }

                Proyecto.count({ usuario: req.params.idUsuario }, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        proyectos,
                        totalProyectos: conteo
                    })

                })


            })
})

// Obtener un proyecto por ID
app.get('/:idProyecto', mdAuth.verificaToken, (req, res) => {
    Proyecto.findOne({ _id: req.params.idProyecto }, (err, proyectoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar proyecto',
                errors: err
            })
        }
        res.status(200).json({
            ok: true,
            proyectoDB,
            usuarioToken: req.usuario
        })
    })

})

// Crear un nuevo proyecto
app.post('/', mdAuth.verificaToken, (req, res) => {
    var body = req.body;

    var proyecto = new Proyecto({
        nombreProyecto: body.nombreProyecto,
        index: body.index,
        style: body.style,
        main: body.main,
        usuario: req.usuario._id
    });

    proyecto.save((err, proyectoGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear proyecto',
                errors: err
            })
        }
        res.status(201).json({
            ok: true,
            proyecto: proyectoGuardado,
            usuarioToken: req.usuario
        })

    })
})



// Actualizar Usuario
app.put('/:idProyecto', mdAuth.verificaToken, (req, res) => {

    var id = req.params.idProyecto;
    var body = req.body;

    Proyecto.findById(id, (err, proyectoEncontrado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar proyecto',
                errors: err
            })
        }
        if (!proyectoEncontrado) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el proyecto con el id' + id + 'no existe',
                    errors: { message: 'No existe un proyecto con ese ID' }
                })
            }
        }
        proyectoEncontrado.nombreProyecto = body.nombreProyecto;
        proyectoEncontrado.index = body.index;
        proyectoEncontrado.style = body.style;
        proyectoEncontrado.main = body.main;
        proyectoEncontrado.save((err, proyectoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar proyecto',
                    errors: err
                })
            }
            res.status(200).json({
                ok: true,
                Proyecto: proyectoGuardado,
                usuarioToken: req.usuario
            })
        })
    })

});

// Eliminar un proyecto
app.delete('/:idProyecto', mdAuth.verificaToken, (req, res) => {
    var id = req.params.idProyecto;

    Proyecto.findByIdAndDelete(id, (err, proyectoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar proyecto',
                errors: err
            })
        }
        if (!proyectoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un proyecto con ID:' + id,
                errors: { message: 'No existe un proyecto con ese ID' }
            })
        }
        res.status(200).json({
            ok: true,
            proyecto: proyectoBorrado,
            usuarioToken: req.usuario
        })
    })
})
module.exports = app;