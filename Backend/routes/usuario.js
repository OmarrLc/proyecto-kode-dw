const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mdAuth = require('../middlewares/auth');
const app = express();
const Usuario = require('../models/usuario')

 
// Obtener todos los usarios
app.get('/', (req, res) => {
    Usuario.find({}, 'nombreUsuario email password img plan ')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios',
                        errors: err
                    })
                }

                res.status(200).json({
                    ok: true,
                    usuarios
                })

            })
})

// Crear un nuevo ususario
app.post('/', (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nombreUsuario: body.nombreUsuario,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        plan: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            })
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        })

    })
})



// Actualizar Usuario
app.put('/:idUsuario', mdAuth.verificaToken, (req, res) => {

    var id = req.params.idUsuario;
    var body = req.body;

    Usuario.findById(id, (err, usuarioEncontrado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            })
        }
        if (!usuarioEncontrado) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el usuario con el id' + id + 'no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                })
            }
        }
        usuarioEncontrado.nombreUsuario = body.nombreUsuario;
        usuarioEncontrado.email = body.email;
        usuarioEncontrado.plan = body.plan;
        usuarioEncontrado.img = body.img;
        usuarioEncontrado.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                })
            }
            usuarioGuardado.password = ':)';
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado,
                usuarioToken: req.usuario
            })
        })
    })

});
 
// Eliminar un usuario
app.delete('/:idUsuario', mdAuth.verificaToken, (req, res) => {
    var id = req.params.idUsuario;

    Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            })
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ID:' + id,
                errors: err
            })
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado,
            usuarioToken: req.usuario
        })
    })

})
module.exports = app;