const express = require('express')
const app = express()
const Contrato = require('../models/contrato')
const Analista = require('../models/analista')
const BancoProyecto = require('../models/banco-proyectos')

app.get('/', (req, res) => {

    BancoProyecto.find()
    .populate('analista', 'nombre apellidos')
    .populate('contrato', 'contrato')
    .exec().then(data => {
        res.status(200).json({OK:true, data})
    }).catch(err => {
        res.status(400).json({OK:false, err})
    })

})

module.exports = app