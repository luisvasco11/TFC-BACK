const mongoose = require('mongoose')
// const validator = require('val')
const Schema = mongoose.Schema
// const controlesSchema = new Schema({
// 	control: {
// 		type:String,
// 		required:true
// 	}
// })
// const Control = mongoose.model('Control', controlesSchema)

const plataformaSchema = new Schema({
	plataforma:{
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true
	},
	img:{
		type:String,
		required:false
	},
	actividad:[{
		type:Schema.Types.ObjectId,
		ref: 'Actividad'
	}],
	controles:[{
		control:{
			type:String,
			required:true
		}
	}],
	servicios_administrados: [
		{
			type:String
		}
	]
	
}, { collection:'plataforma' } )

const Plataforma = mongoose.model('Plataforma', plataformaSchema)

module.exports = Plataforma