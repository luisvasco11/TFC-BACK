const mongoose = require('mongoose')
const Schema = mongoose.Schema

const aditoriaContratosSchema = new Schema({
	contrato:{
        type:Schema.Types.ObjectId,
		ref: 'Contrato'
	},
	control:{
		type:Schema.Types.ObjectId,
		ref: 'Control'
    },
    respuestas:[{
        mes:{
            type:String
        },
        anio:{
            type:String
        },
        respuesta:{
            type:String
        },
        ruta_archivo:{
            type:String
        }
    }]
}, { collection:'auditoria_contratos' } )

const AuditoriaContrato = mongoose.model('AuditoriaContrato', aditoriaContratosSchema)

module.exports = AuditoriaContrato