const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventoCalendarioSchema = new Schema({
	titulo:{
		type: String,
		required: true,
		trim: true,
		minlength: 1
    },
    tipo:{
        type:String,
        required:true
    },
	contrato:{
		type:Schema.Types.ObjectId,
		ref: 'Contrato'
	},
	programador:{
		type:Schema.Types.ObjectId,
		ref: 'Analista'
    },
    date: {
        type:String,
        required:true
    },
    conclusiones:[
        {
            conclusion: {
                type:String
            }
        }
    ],
    compromisos:[
        {
            compromiso: {
                type:String
            },
            responsable:{
                type:String
            },
            fecha:{
                type: Date
            }
        }
    ], 
    integrantes:[
        {
            nombre: {
                type:String
            },
            cedula:{
                type: String
            },
            cargo:{
                type:String
            },
            img: {
                type:String
            }
        }
    ]

}, { collection:'evento_calendario' } )

const EventoCalendario = mongoose.model('EventoCalendario', EventoCalendarioSchema)

module.exports = EventoCalendario