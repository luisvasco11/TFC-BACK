const express = require('express')
const Analista = require('../models/analista')
const jwt = require('jsonwebtoken')
const SEED = require('../config/config').SEED

const app = express()

app.post('/', (req, res) => {
    Analista.findOne({cedula: req.body.cedula.cedula}).populate('GrupoPermiso', 'rutas').then((analista) => {
       
        if(!analista){
            return res.status(400).json({
                OK:false,
                mensaje:'Error al buscar el usuario'
            })
        }
        let token = jwt.sign({analista:analista}, SEED, {expiresIn:14400})
        res.status(200).json({
            OK:true,
            analista:analista,
            token:token, 
        })

    }).catch(err => {
        res.send(err)
    })
})

app.post('/invitado', (req, res) => {
    Analista.findOne({email: req.body.correo}).then((analista) => {
       
        if(!analista){
            return res.status(400).json({
                OK:false,
                mensaje:'Error al buscar el usuario'
            })
        }
        if(analista.proyecto !== req.body.pass){
            return res.status(400).json({
                OK:false,
                mensaje:'Contraseña invalida'
            })
        }

        res.status(200).json({
            OK:true,
            analista:analista
        })

    }).catch(err => {
        res.send(err)
    })
})

module.exports = app 