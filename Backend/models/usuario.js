const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var usuarioSchema = new Schema({

    nombreUsuario: { type: String, required: [true, 'Nombre de usuario requerido'] },
    email: { type: String, unique: true, required: [true, 'Correo requerido'] },
    password: { type: String, required: [true, 'Contraseña requerida'] },
    img: { type: String, required: false },
    plan: { type: String, required: true, default: 'NOOB' },
    google: { type: Boolean, default: false }

});

module.exports = mongoose.model('Usuario', usuarioSchema);