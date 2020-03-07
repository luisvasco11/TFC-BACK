const mongoose = require('mongoose')


const Schema = mongoose.Schema

const eventoSchema = new Schema({
    numero:{
        type:Number,
    },
    componente:[{
        type:Schema.Types.ObjectId
    }],
    tipoEvento:{
        type:String,
        required:true,
        trim:true,
        uppercase:true
    },
    causaEvento:{
        type:String,
        required:true,
        trim:true,
        uppercase:true
    },
    tipoActividad:{
        type:String,
        required:true,
        trim:true,
        uppercase:true
    },
    reporta:{
        type:Schema.Types.ObjectId,
		ref: 'Analista'
    },
    responsable:{
        type:Schema.Types.ObjectId,
		ref: 'Analista'
    },
    fecha:{
        type:Date,
        required:true,
        trim:true
    },
    tiempoActividad:{
        type:Number,
        default:0,
        trim:true
    },
    mesa:{
        type:String,
        required:true,
        trim:true
    },
    estado:{
        type:String,
        required:true,
        trim:true,
        uppercase:true
    },
    descripcion:{
        type:String,
        required:true,
        trim:true
    },
    tipo:{
        type:String,
        trim:true,
        enum:['MASIVO', 'INDIVIDUAL'],
        uppercase:true
    },
    solucion:{
        tipo:{
            type:String,
            trim:true
        },
        numRfc:{
            type:String,
            trim:true,
            default:'NO APLICA'
        },
        ticket: {
            type:String
        },
        fechaCierre:{
            type:Date
        },
        cierraEvento:{
            type:Schema.Types.ObjectId,
            ref: 'Analista'
        },
        huboCambio:{
            type:String
        },
        detalles:{
            type:String,
            trim:true
        }
    }
    
},{ collection:'evento', timestamps:true } )

const Evento = mongoose.model('Evento', eventoSchema)

module.exports = Evento