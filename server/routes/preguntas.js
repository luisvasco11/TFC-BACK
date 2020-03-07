const express = require('express')
const app = express()

const Pregunta = require('../models/preguntas')

app.get('/', (req, res) => {

    Pregunta.find().then(data => {
        res.status(200).json({OK:true, data})
    }).catch(err => {
        res.status(400).json({OK:false, err})
    })

})

module.exports = app