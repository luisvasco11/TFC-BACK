const mongoose = require('mongoose')
const Schema = mongoose.Schema

const iniciativaProyectoSchema = new Schema({
    fecha_creacion: {
        type:Date,
        required:true,
        default: new Date()
    },
    estado:{
        type:String,
        required:true,
        trim:true
    },
    analista: {
        type:Schema.Types.ObjectId,
		ref: 'Analista'
    },
    contrato:{
        type:Schema.Types.ObjectId,
        ref:'Contrato',
        required:true
    },
    plataforma:{
        type:Schema.Types.ObjectId,
		ref: 'Plataforma'
    },
    antecedentes:{
        type:String,
        required:true,
        trim:true
    },
    iniciativa:{
        type:String,
        required:true,
        trim:true
    },
    logros:{
        type:String,
        required:true,
        trim:true
    }, 
    tipo:{
        type:Number,
        required:true
    },
    actividades:[
       {
            actividad: {
                type:String,
                required:true,
                trim:true
            },
            porcentaje: {
                type:Number,
                required:true,
                trim:true
            },
            estado: {
                type:String,
                required:true,
                trim:true
            },
            responsable: {
                type:String,
                required:true,
                trim:true
            },
            fechaFinalizacion:{
                type:Date,
                required:false
            },
            estaEliminada:{
                type:Boolean,
                required:false,
                default:false
            },
            analistaElimina: {
                type:Schema.Types.ObjectId,
                ref: 'Analista',
                required:false
            },
            fecha_creacion:{
                type:Date,
                required:false,
                default: new Date()
            }
       }
    ]
}, { collection:'iniciativa' } )

const Iniciativa = mongoose.model('Iniciativa', iniciativaProyectoSchema)

module.exports = Iniciativa