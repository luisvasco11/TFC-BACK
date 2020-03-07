const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecursosShema = new Schema({
    horarios: [],
    servicios: [],
    ambiente: [],
    umbrales: [],
    tipo_dispositivos: [],

}, { collection: 'recursos' })

const Recurso = mongoose.model('Recurso', RecursosShema)
module.exports = Recurso