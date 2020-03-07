const mongoose = require('mongoose')
const Schema = mongoose.Schema

const powerBiSchema = new Schema({
	nombre:{
    type:String,required:true
  },
  img:{
    type:String,required:true
  },
  estilos:{
    color:{
      type:String,required:true
    }
  },
  contratos:[{
    contrato:{
      type:Schema.Types.ObjectId,
      ref: 'Contrato'
    },
    link:{
      type:String,required:true

    }
  }

  ],

}, { collection:'power_bi' } )






const PowerBi = mongoose.model('PowerBi', powerBiSchema)

module.exports = PowerBi
