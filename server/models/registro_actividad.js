const mongoose = require('mongoose')
const Schema = mongoose.Schema

const registroActividadSchema = new Schema({
    actividad:{
        type:Schema.Types.ObjectId,
        ref:'Actividad',
        required:false
    },
    analista:{
        type:Schema.Types.ObjectId,
        ref:'Analista',
        required:true
    },
    contrato:{
        type:Schema.Types.ObjectId,
        ref:'Contrato',
        required:false
    },
    fecha:{
        type: Date,
        required:true
    },
    ticket:{
        type:String,
        required:false
    },
    contador:{
        type: Number,
        default:0,
        required:false
    },
    fecha_inicio:{
        type: Date,
        required:false,
    },
    fecha_fin:{
        type: Date,
        required:false,
    },
    tipo:{
        type: String,
        required:false,
    },
    descripcion:{
        type:String,
        required:false,
    },
    evidencia:{
        type:String,
        required:false
    }
},{collection:'registro_actividad'})

registroActividadSchema.statics.registroDiario = function(ids){
    let registros = []
    ids.forEach(id => {
        let registro = {}
        registro.contador = 0
        registro.actividad = "5cb6b7aad559624a010e3d8b"
        registro.analista = id._id
        registro.contrato = "5cb6bb63d559624a010e3d8c"
        registro.fecha = new Date()
        registros.push(registro)
    })

    return registros

    

}

const RegistroActividad = mongoose.model('RegistroActividad', registroActividadSchema)

module.exports = RegistroActividad
