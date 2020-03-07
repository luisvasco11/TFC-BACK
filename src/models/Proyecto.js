const { Schema, model } = require('mongoose');

const proyectoSchema = new Schema({
    proyecto: String,
    definicion: String,   
}, {
    timestamps: true
});

module.exports = model('Proyecto', proyectoSchema, 'proyectos');
