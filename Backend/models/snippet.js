const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var snippetSchema = new Schema({

    nombreSnippet: { type: String, required: [true, 'Nombre de snippet requerido'] },
    tipo: { type: String, required: [true, 'Tipo de snippet requerido'] },
    contenido: { type: String },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, { collection: 'snippets' });

module.exports = mongoose.model('Snippet', snippetSchema);