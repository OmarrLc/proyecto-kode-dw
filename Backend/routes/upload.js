const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const Usuario = require('../models/usuario');

app.use(fileUpload());

app.put('/:idUsuario', (req, res) => {
    var id = req.params.idUsuario;
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: { message: 'Error al subir imagen' }
        });
    };
    // Obtener nombre archivo
    var archivo = req.files.imagen;
    var nombreSeparado = archivo.name.split('.');
    var extensionArchivo = nombreSeparado[nombreSeparado.length - 1]

    // Exteniones aceptadas

    var extensionesValidas = ['png', 'jpg', 'jpeg'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no valida',
            errors: { message: 'La estexiones validas son: ' + extensionesValidas.join(', ') }
        });
    }

    // Nombre de archivo personalizado
    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`

    // Mover archivo del temporal al path
    var path = `./archivosUploads/usuarios/${nombreArchivo}`;
    archivo.mv(path, function(err) {
        if (err)
            return res.status(500).send(err);
    });

    subirImgUsuario(id, nombreArchivo, res);

});

function subirImgUsuario(id, nombreArchivo, res) {

    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al subir archivo',
                errors: err
            });
        }
        var pathOld = './archivosUploads/usuarios/' + usuarioDB.img;

        // Si existe, elimina la imagen anterior
        if (fs.existsSync(pathOld)) {
            fs.unlinkSync(pathOld);
        }

        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioActualizado) => {
            usuarioActualizado.password = ':)'
            return res.status(200).json({
                ok: true,
                mensaje: 'Imagen de usuario actualizada',
                usuarioActualizado
            });
        })
    });
}
module.exports = app;