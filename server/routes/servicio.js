const express = require('express')
const app = express()
const Servicio = require('../models/servicio')

app.post('/', (req, res) => {
    let servicios = req.body.servicios
    Servicio.insertMany(servicios).then(data => {
        res.status(200).json({OK:true, data})
    }).catch(err => {
        res.send(err)
    })
})

app.get('/', (req, res) => {
    Servicio.find().then((servicios) => {
        res.status(200).json({OK:true, servicios})
    }).catch((error) => {
        res.status(400).json({OK:false, error})
    })
})

app.get('/:contrato/:mes/anio', (req, res) => {
    
})

module.exports = app