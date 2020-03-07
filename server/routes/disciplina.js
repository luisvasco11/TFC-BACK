const express = require('express')
const app = express()
const Disciplina = require('../models/disciplina')


app.get('/', (req, res) => {
    Disciplina.find().then(disciplinas => {
        res.status(200).json({OK:true, disciplinas})
    }).catch((error) => {
        res.status(404).json({OK:true, error})
    })
})

module.exports = app