const { Schema, model } = require('mongoose');

const JustificacionSchema = new Schema({
    proyecto: String,
    justificacion: String
}, {
    timestamps: true
});

module.exports = model('Justificacion', JustificacionSchema, 'justificaciones');
