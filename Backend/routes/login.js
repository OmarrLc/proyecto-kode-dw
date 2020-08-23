const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const Usuario = require('../models/usuario');
var SEED = require('../config/config').SEED

// Google
var CLIENT_ID = require('../config/config').CLIENT_ID
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);


// Autenticacion Normal
app.post('/', (req, res) => {
    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            })
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales Incorrectas',
                errors: err
            })
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales Incorrectas',
                errors: err
            })
        }
        usuarioDB.password = ':)';

        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14000 })

        res.status(200).json({
            ok: true,
            usuarioDB,
            token,
            id: usuarioDB._id
        })
    })

})

// Autenticacion de google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();
    // const userid = payload['sub'];

    return {
        nombreUsuario: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
}

app.post('/google', async(req, res) => {


    var token = req.body.token;
    var googleUser = await verify(token)
        .catch(err => {
            return res.status(403).json({
                ok: false,
                mensaje: 'Token no valido',
                errors: err
            })
        })

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            })
        }

        if (usuarioDB) {
            if (usuarioDB.google === false) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Debe de usar otra forma de autenticacion',

                })
            } else {
                var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14000 })

                res.status(200).json({
                    ok: true,
                    usuarioDB,
                    token,
                    id: usuarioDB._id
                })
            }
        } else {
            // El Uusuario no exitse hay que crearlo
            var usuario = new Usuario();
            usuario.nombreUsuario = googleUser.nombreUsuario;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ':)';

            usuario.save((err, usuarioDB) => {
                var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14000 })

                res.status(200).json({
                    ok: true,
                    usuarioDB,
                    token,
                    id: usuarioDB._id
                })
            })
        }

    })

})


module.exports = app;