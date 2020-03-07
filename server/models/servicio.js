const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ServicioSchema = new Schema({
	servicio:{
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true
	}
}, { collection:'servicio' } )

const Servicio = mongoose.model('Servicio', ServicioSchema)

module.exports = Servicio