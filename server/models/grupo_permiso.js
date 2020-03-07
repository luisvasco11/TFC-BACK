const mongoose = require('mongoose')

const Schema = mongoose.Schema

const GrupoPermisoSchema = new Schema({
    dependencia : {
        type:String,
        required:true,
        trim: true
    },
    role : {
        type:String,
        required:true,
        trim: true
    },
    descripcion : {
        type:String,
        required:true,
        trim: true
    },
    rutas : [{
        ruta: {
            type:String,
            required:true,
            trim: true
        }
    }],
},{ collection:'grupos_permisos' } )

const Host = mongoose.model('GrupoPermiso', GrupoPermisoSchema)

module.exports = Host