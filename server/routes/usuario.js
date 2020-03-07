const express = require('express')
const Iniciativa = require('../models/iniciativas')
const Contrato = require('../models/contrato')
const Analista = require('../models/analista')
const Plataforma = require('../models/plataformas')
const mongoose = require('mongoose')
const app = express()

app.get('/lider', (req, res) => {
    Analista.find({ $or: [{ cargo: { $regex: /Lider/ } }, { cargo: { $regex: /Líder/ } }, { cargo: { $regex: /LIDER/ } }, { cargo: { $regex: /LÍDER/ } }] })
        .exec().then(a => res.status(200).json(a)).catch(e => res.status(400).json(e))
})

app.get('/li', (req, res) => {
    res.send(200)
})

app.get('/analistas/lider/:lider', (req, res) => {
    Analista.find({ lider: req.params.lider })
        .then(a => {
            if (a.length === 0) {
                return res.status(200).json([{
                    plataforma: [],
                    contrato: [],
                    _id: 'no-analistas',
                    cedula: '',
                    nombre: 'No tienes analistas',
                    apellidos: '',
                    email: '',
                    cargo: '',
                    lider: '',
                    proyecto: '',
                    centro_costos: '',
                    img: '',
                    registra: true
                }])
            }
            res.status(200).json(a)
        }).catch(e => res.status(400).json(e))
})

module.exports = app