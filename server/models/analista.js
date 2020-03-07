const mongoose = require('mongoose')
// const validator = require('val')
const Schema = mongoose.Schema


const analistaSchema = new Schema({
	cedula:{
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true
	},
	nombre:{
		type: String,
		required: true,
		trim: true,
		minlength: 1
	},
	apellidos:{
		type: String,
		trim: true,
		minlength: 1
	},
	email:{
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
	},
	plataforma:[{
		type:Schema.Types.ObjectId,
		ref: 'Plataforma'
	}],
	cargo:{
		type:String,
		trim: true,
	}, 
	lider:{
		type:Schema.Types.ObjectId,
		ref: 'Analista'
	},
	proyecto:{
		type: String
	},
	contrato:[{
		type:Schema.Types.ObjectId,
		ref: 'Contrato'
	}],
	centro_costos:{
		type:String
	},
	img:{
        type:String,
        required:false,
	},
	celular:{
		type:Number,
	},
	registra:{
		type:Boolean,
	},
	rol:{
		type:String,
		required:false,
		enum:['LIDER', 'ANALISTA', 'MONITOREO']
	},
	grupo_permisos: {
		type:Schema.Types.ObjectId,
		ref: 'GrupoPermiso'
	}
}, { collection:'analista' } )

const Analista = mongoose.model('Analista', analistaSchema)

module.exports = Analista