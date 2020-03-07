const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bancoProyectoSchema = new Schema({
	contrato:{
        type:Schema.Types.ObjectId,
		ref: 'Contrato'
	},
	analista:{
		type:Schema.Types.ObjectId,
		ref: 'Analista'
    },
    descripcion:{
        type:String,
        required:true,
        minlength:5
    },
    ruta_archivo:{
        type:String,
        required:false,
    }
}, { collection:'banco-proyecto' } )

const BancoProyecto = mongoose.model('BancoProyecto', bancoProyectoSchema)

module.exports = BancoProyecto