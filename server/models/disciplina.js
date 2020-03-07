const mongoose = require('mongoose')

const Schema = mongoose.Schema

const disciplinaSchema = new Schema({
    proceso:{
        type:String,
        required:true,
        trim:true
    },
    estandar:{
        type:String,
        required:true,
        trim:true
    },
    controles:[
        {
            control:{
                type:String
            }
        }
    ],
    img:{
        type:String,
        required:true,
        default:'https://pati.arus.com.co/images/disciplinas/calidad.png'
    }
},{ collection:'disciplinas' } )

const Disciplina = mongoose.model('Disciplina', disciplinaSchema)

module.exports = Disciplina