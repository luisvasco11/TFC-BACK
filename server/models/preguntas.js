const mongoose = require('mongoose')
// const validator = require('val')
const Schema = mongoose.Schema


const preguntaSchema = new Schema({
	pregunta:{
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true
	},
	valor:{
		type: Number,
		required: true,
		trim: true,
		minlength: 1
	}
}, { collection:'pregunta' } )

const Pregunta = mongoose.model('Pregunta', preguntaSchema)

module.exports = Pregunta