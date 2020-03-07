const mongoose = require('mongoose')
const Schema = mongoose.Schema


const AusentismoSchema = new Schema({
	tipoAusentiso: {
        type:String,
        required:true,
        trim:true
    },
    codigoSoftControl: {
        type:String,
        trim:true
    },
    valorAusentismo: {
        type:String,
        required:true,
        trim:true
    },
    fechaInicio: {
        type:Date,
        required:true
    },
    fechaFin: {
        type:Date,
        required:true
    },
    horaInicio: {
        type:String,
        required:true,
        trim:true
    },
    horaFin: {
        type:String,
        required:true,
        trim:true
    },
    justificacion: {
        type:String,
        required:true,
        trim:true
    },
    analista: {
        type:Schema.Types.ObjectId,
        ref: 'Analista'
    },
    analistaRegistra: {
        type:Schema.Types.ObjectId,
        ref: 'Analista'
    },
    justificacionNegacion:{
        type:String,
        trim:true
    },
    estado: {
        type:String,
        required:true,
        enum:['SOLICITUD CREADA', 'SOLICITUD APROBADA', 'SOLICITUD NEGADA']
    }
}, { collection:'ausentismos' } )

const Ausentismo = mongoose.model('Ausentismo', AusentismoSchema)

module.exports = Ausentismo