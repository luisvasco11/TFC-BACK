const express = require('express')
const Incapacidad = require('../models/incapacidad')
const app = express()


app.post('/', (req, res) => {
    Incapacidad.find().then((incapacidades) => {
        res.status(200).json({ OK: true, incapacidades })
    })
    /*let host = new Host(req.body)
    host.save().then(nuevoHost => {
        res.status(200).json({ OK: true, nuevoHost })
    }).catch( (err) => {
        res.status(400).json({ OK: false, err })
    })*/
})

module.exports = app
