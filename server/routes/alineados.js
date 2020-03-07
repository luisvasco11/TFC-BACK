const express = require('express')
const app = express()
const Alineados = require('../models/alineados')


app.get('/', (req, res) => {
    Alineados.find().then(alineados => {
        res.status(200).json({OK:true, alineados})
    }).catch((error) => {
        res.status(404).json({OK:true, error})
    })
})

module.exports = app