const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contratoSchema = new Schema({
    contrato:{
        type:String,
        required:true
    },
    centro_costos:{
        type:String,
        required:true
    },
    pregunta:[{
        pregunta:{
            type:Schema.Types.ObjectId,
            ref: 'Pregunta'
        },
        respuesta:{
            type:String,
            require:true
        }
    }],
    plataforma:[
        {
            type:Schema.Types.ObjectId,
            ref: 'Plataforma'
        }
    ],
    lider:{
        type:Schema.Types.ObjectId,
        ref: 'Analista'
    },
    Area:{
        type:String,
        required:false
    },
    Estado:{
        type:String,
        required:false,
        default:'Abierto'
    },
    img:{
        type:String,
        required:false,
        default:'http://webresultsguide.com/img/r1c.png'
    },
    zona:{
        type:String,
        required:false,
    },
    unidadNegocio:{
        type:String,
        required:false,
    },
    servicios:[
        {
            ansAcordado:{
                type:Number,
                required:true,
                
            },
            servicio:{
                unique:true,
                type:Schema.Types.ObjectId,
                ref: 'Servicio'
            }
        }
    ],
    generales:[
        {
            proceso: {
                type:String,
                required:false
            }, 
            controles: [
                {
                    control:{
                        type:String
                    },
                    respuesta:{
                        type:String 
                    },
                    rutaArchivo:{
                        type:String
                    }
                }
            ]
        }
    ],
    controles:[{
        nombre: {
            type:String,
            controles: [{
                control:{
                    type:String
                },
                respuesta:{
                    type:String 
                },
                rutaArchivo:{
                    type:String
                }
            }]
        }
    }],
    procesos:[{
        type: Schema.Types.ObjectId,
        ref:'Disciplina'
    }],
    hojaDeVida: {
        horarioDeAtencion:{
            type:String
        },
        aplicaDisponibilidad:{
            type:String
        },
        servicios: [{
            linea:{
                type:String,
            },
            duracionContrato: {
                type:String
            },
            fechaInicio: {
                type:String
            },
            fechaFin: {
                type:String
            },
            facturacion: {
                type:String
            },
            lider: {
                type:Schema.Types.ObjectId,
                ref: 'Analista'
            }
        }]
    }
},{ collection:'contrato' } )

const Contrato = mongoose.model('Contrato', contratoSchema)

module.exports = Contrato