const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClienteSchema = new Schema({
    cliente:{
        type:String,
        trim:true,
        required:true,
        uppercase:true
    },
    ciudad:{
        type:String,
        trim:true,
        required:true,
        uppercase:true
    },
    NIT: {
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    tipoCliente: {
        type:String,
        trim:true,
        required:true,
        uppercase:true
    },
    gerenteCuenta:{
        type:String,
        trim:true,
        required:true
    },
    correoGerenteCuenta:{
        type:String,
        trim:true,
        required:true
    },
    contacto: {
        nombre: {
            type:String,
            trim:true,
            uppercase:true
        },
        cargo:{
            type:String,
            trim:true,
            uppercase:true
        },
        correo:{
            type:String,
            trim:true,
        },
        telefono:{
            type:String,
            trim:true
        },
        indicativo:{
            type:String,
            trim:true, 
        },
        ext1:{
            type:String,
            trim:true,
        },
        ext2:{
            type:String,
            trim:true,
        },
        IVR:{
            type:String,
            trim:true,
        },
        celularCorporativo:{
            type:String,
            trim:true,
        }   
    },
    acuerdoPago: [{
        fechaPago: {
            type:Date
        },
        observaciones:{
            type:String,
            trim:true,
            default:""
        },
        usuario:{
            type:Schema.Types.ObjectId,
            ref: 'Analista'
        },
        fechaCreacion: {
            type: Date,
            default: new Date()
        }
    }],
    interacciones: {
        Fecha:{
            type: String,
            default:'Sin hacer contacto',
            required:true
        },
        Interacciones: {
            type:String
        }
    },
    procesoEnCobroJuridico:{
        type:Boolean
    },
    gestionCartera: [{
            usuario:{
                type:Schema.Types.ObjectId,
		        ref: 'Analista'
            },
            fechaRegistro: {
                type: Date,
                default: new Date()
            },
            documentacion:{
                type:String
            }
        }
    ]
    
}, { collection:'clientes' } )

const Cliente = mongoose.model('Cliente', ClienteSchema)

module.exports = Cliente