const mongoose = require('mongoose')
const Schema = mongoose.Schema

const registroIndicadorSchema = new Schema({
    contrato:{
        type:Schema.Types.ObjectId,
        ref:'Contrato'
    },
    servicio:{
        type:Schema.Types.ObjectId,
        ref:'Servicio'
    },
    ansAcordado:{
        type:Number,
        trim:true,
        required:true 
    },
    anio:{
        type:Number,
        trim:true,
        required:true  
    },
    mes:{
        type:Number,
        trim:true,
        required:true
    },
    indicadorArus:{
        type:Number,
        trim:true,
        required:true
    },
    indicadorCliente:{
        type:Number,
        trim:true,
        required:true
    },
    indicadorGeneral:{
        type:Number,
        trim:true,
        required:true
    },
    cumplimiento:{
        type:Number,
        trim:true,
        required:true
    },
    justificacion:{
        type:String,
        trim:true,
        required:true
    },
    planAccion:{
        type:String,
        trim:true,
        required:true,
        default:'N/A'
    },
    registradoPor:{
        type:Schema.Types.ObjectId,
        ref: 'Analista'
    },
    fechaRegistro:{
       type:Date,
       required:true
    },
    
},{collection:'registro_indicador'})

const RegistroIndicador = mongoose.model('RegistroIndicador', registroIndicadorSchema)

module.exports = RegistroIndicador
