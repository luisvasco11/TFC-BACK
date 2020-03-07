const mongoose = require('mongoose')

const Schema = mongoose.Schema

const incapacidadSchema = new Schema({
    analista:{
        type:Schema.Types.ObjectId,
        ref: 'Analista'
    },
    diagnostico:{
       type:String,
       trim:true,
       required:true,
       default:""
    },
    naturaleza:{
       type:String,
       trim:true,
       required:true
    },
    tipo:{
       type:String,
       trim:true,
       required:true
    },
    fechaInicio:{
       type:String,
       trim:true,
       required:true
    },
    fechaFin:{
       type:String,
       trim:true,
       required:true
    },
    file:{
        type:String,
        required:false
    }
},{ collection:'incapacidad' } )

const Incapacidad = mongoose.model('Incapacidad', incapacidadSchema)

module.exports = Incapacidad