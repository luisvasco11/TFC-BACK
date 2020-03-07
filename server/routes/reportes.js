const express = require('express')
const Iniciativa = require('../models/iniciativas')
const Contrato = require('../models/contrato')
const Analista = require('../models/analista')
const Plataforma = require('../models/plataformas')
const mongoose = require('mongoose')
const Actividad = require('../models/actividad')
const RegistroActividad = require('../models/registro_actividad')
const app = express()

app.get('/iniciativas/:tipo/:id', (req, res) => {
    if (req.params.tipo === 'contrato') {
        Iniciativa.find({ contrato: req.params.id })
            .select('iniciativa plataforma contrato estado actividades analista')
            .populate('analista', 'nombre apellidos')
            .populate('contrato', 'contrato')
            .populate('plataforma', 'plataforma img')
            .exec().then(a => res.status(200).json(a)).catch(e => res.status(400).json(e))
    } else {
        req.params.tipo === 'analista'
        Iniciativa.find({ analista: req.params.id })
            .select('iniciativa plataforma contrato estado actividades analista')
            .populate('analista', 'nombre apellidos')
            .populate('plataforma', 'plataforma img')
            .populate('contrato', 'contrato')
            .exec().then(a => res.status(200).json(a)).catch(e => res.status(400).json(e))
    }
})
app.get('/plataforma/kjd',(req,res)=>{
    Actividad.find('plataforma')
    .then(data =>{
        res.status(200).json({OK:true})
    }).catch(err =>{
        res.status(400).json({OK:false,err})
    })
})

app.get('/actividadesdiarias/:analista', (req, res) => {
    
    let hoy =  new Date()
    let fecha1 = new Date ( hoy.getTime() - ( ( hoy.getHours() * 60 * 60 * 1000) + ( 29 * 60 * 60 * 1000) + ( hoy.getMinutes() * 60 * 1000) ) )
    //let fecha2 = `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`
    RegistroActividad.find(
        {
            $and: [
                { analista: req.params.analista }, 
                { fecha: { $gt: fecha1 } }
            ]
        }).populate('contrato', 'contrato')
          .populate('actividad')
          .exec().then(data => {
            res.status(200).json({OK:true, data})
    }).catch(err => {
        res.status(200).json({OK:false, err})
    })
})

module.exports = app