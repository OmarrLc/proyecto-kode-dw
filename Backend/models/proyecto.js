const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var proyectoSchema = new Schema({

    nombreProyecto: { type: String, required: [true, 'Nombre de proyecto requerido'] },
    index: { type: String },
    style: { type: String },
    main: { type: String },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, { collection: 'proyectos' });

module.exports = mongoose.model('Proyecto', proyectoSchema);