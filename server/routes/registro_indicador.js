const express = require('express')
const app = express()
const RegistroIndicador = require('../models/registro_indicador')
const Contrato = require('../models/contrato')
const mongoose = require('mongoose')
const Servicio = require('../models/servicio')

app.post('/', (req, res) => {
    let indicador = {
        ...req.body.servicio, 
        servicio: req.body.servicio.servicio._id, 
        _id:mongoose.Types.ObjectId()
    }
    indicador.fechaRegistro = new Date()
    const nuevoIndicador = new RegistroIndicador(indicador)
    nuevoIndicador.save().then(indicadorRegistrato => {
        res.status(200).json({OK:true, indicadorRegistrato})
    }).catch((err) => {
        res.status(400).json({OK:false, err})
    })
})

app.get('/:contrato/:mes/:anio', (req, res) => {
    const { contrato, mes, anio } = req.params
    RegistroIndicador.find({$and:[{contrato:contrato},{mes:mes},{anio:anio}]}).populate('servicio').exec().then(indicadoresContrato => {
        res.status(200).json({OK:true, indicadoresContrato})
    }).catch((error) => {
        res.status(400).json({OK:false, error})
    })
})

module.exports = app 