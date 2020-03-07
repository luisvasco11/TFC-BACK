const mongoose = require('mongoose')

const Schema = mongoose.Schema

const escalamientoSchema = new Schema({
    plataforma:{
        type:Schema.Types.ObjectId,
        ref: 'Plataforma'
    },
    servicioAdministrado: {
        type:String
    },
    contrato:{
        type:Schema.Types.ObjectId,
        ref: 'Contrato'
    },
    esquema:[{
        analista:{
            type:Schema.Types.ObjectId,
            ref: 'Analista'
        },
        nivel:{
            type:Number,
            required:true
        }
    }]
},{ collection:'escalamiento' } )

const Escalamiento = mongoose.model('Escalamiento', escalamientoSchema)

module.exports = Escalamiento