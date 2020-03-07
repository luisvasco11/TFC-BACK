const mongoose = require('mongoose')

const Schema = mongoose.Schema

const alineadosSchema = new Schema({
    ordenInterna:{
        type:String,
        required:true
    },
    ordenCeco:{
        type:String,
        required:true
    },
    unidadNegocio:{
        type:String,
        required:true
    },
    zona:{
        type:String,
        required:true
    }
},{ collection:'alineados' } )

const Alineados = mongoose.model('Alineados', alineadosSchema)

module.exports = Alineados