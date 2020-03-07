const express = require('express')
const app = express()
const EventoCalendario = require('../models/eventoCalendario')

app.post('/', (req, res) => {
    let eventoCalendario = new EventoCalendario( req.body.evento )
    eventoCalendario.save().then(data => {
        res.status(200).json({OK:true, data})
    }).catch(err => {
        res.status(400).json({OK:false, err})
    })
})

app.get('/', async (req, res) => {
    try {
        const eventosCalendario = await EventoCalendario.find().populate('programador', 'nombre').populate('contrato', 'contrato').exec()
        res.status(200).json({OK:true, eventosCalendario})
    } catch (error) {
        res.status(400).json({OK:false, error})  
    }

})

app.get('/:id', async (req, res) => {
    const { id } = req.params 
    try {
        const eventoCalendario = await EventoCalendario.findById(id).populate('programador', 'nombre').populate('contrato', 'contrato').exec()
        res.status(200).json({OK:true, eventoCalendario})
    } catch (error) {
        res.status(400).json({OK:false, error}) 
    }
})

app.get('/analista/:id', async (req, res) => {
    const { id } = req.params 
    try {
        const eventosCalendario = await EventoCalendario.find({programador:id}).populate('programador', 'nombre').populate('contrato', 'contrato').exec()
        res.status(200).json({OK:true, eventosCalendario})
    } catch (error) {
        res.status(400).json({OK:false, error}) 
    }
})

app.patch('/:id', async (req, res) => {
    const { id } = req.params
    try {        
        const respuesta = await EventoCalendario.updateOne({ _id: id }, req.body.evento)
        res.status(200).json({OK:true, data:respuesta})
    } catch (error) {
        res.status(400).json({OK:false, error})
    }
})


module.exports = app