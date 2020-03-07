const mongoose = require('mongoose')
const Schema = mongoose.Schema
const actividadSchema = new Schema({

    descripcion:{
        type:String,
        require:true
    },
    tiempo:{
        type:Number,
        require:true
    },
    categoria:{
        type:String,
        require:true
    },
}, { collection:'actividad' } )

const Actividad = mongoose.model('Actividad', actividadSchema)

module.exports = Actividad