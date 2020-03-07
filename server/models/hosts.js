const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HostSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    ip: {
        type: String,
        required: true,
        unique: true
    },
    contrato: {
        type: Schema.Types.ObjectId,
        ref: 'Contrato',
        required: true
    },
    horario: {
        type: String,
        required: true,
        trim: true
    },
    ambiente: {
        type: String,
        required: true
    },
    servicio_negocio: {
        type: String,
        required: true,
        trim: true
    },
    tipo_dispositivo: {
        type: String,
        required: true
    },
    componentes:[{
            
        plataforma:{
            type: Schema.Types.ObjectId,
            ref: 'Plataforma',
            required: true
        },
        servicio_administrado: {
            type: String,
            required: true,
            trim: true
        },
        componente:{
            type:String
        },
        delay:{
            type:String,
            required:true
        },
        tiempo_chequeo:{
            type:String,
            required:true
        },
        warning:{
            type:String,
            required:true
        },
        critical:{
            type:String,
            required:true
        },
        tipo_umbral:{
            type:String,
            required:true
        },
        horario:{
            type:String,
            required:true
        },
        accion_critica: [
            {
                accion: {
                    type:String,
                    required:true
                }
            }
        ], 
        escalamientoUnitario:{
            type:Boolean,
            default:false
        },
        escalamiento:[{
            analista:{
                type:Schema.Types.ObjectId,
                ref: 'Analista'
            },
            nivel:{
                type:Number,
                required:true
            }
        }]
    }]
        
}, { collection: 'hosts' })

const Host = mongoose.model('Host', HostSchema)
module.exports = Host