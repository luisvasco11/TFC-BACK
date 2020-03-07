const express = require('express')
const app = express()
const Analista = require('../models/analista')
const Contrato = require('../models/contrato')

app.get('/:id', (req, res) => {
    let id = req.params.id
    Analista.findById(id)
    .populate({ 
        path: 'plataforma', 
        populate: { path:'actividad' } })
    .exec().then( analistas => {
        res.status(200).json(analistas)
    }).catch( (err) => {
        res.status(400).json(err)
    })
})
 

module.exports = app 