const express = require('express')
const app = express()
const Host = require('../models/host')
const Iniciativa = require('../models/iniciativas')
const Contrato = require('../models/contrato')
const Schema = require('mongoose')

app.post('/', (req, res) => {
    let host = new Host(req.body)
    host.save().then(data => res.status(200).json({data, OK:true})).catch(error => res.status(400).json({error, OK:false}))
})

app.get('/', (req, res) => {
    
    // Iniciativa.find({contrato:'5c17c51aa60b0705a269ecdd'}).populate('contrato', 'contrato').exec().then(data => { 
    //     res.status(200).json({data, OK:true})
    // }).catch(error => { 
    //     res.status(400).json({error, OK:false}) 
    // })

    Iniciativa.aggregate([
        { $match: { contrato : { $eq : Schema.Types.ObjectId("5c17c51aa60b0705a269ecdd")} } }
    ]).then(data => { 
        res.status(200).json({data, OK:true})
    }).catch(error => { 
        res.status(400).json({error, OK:false}) 
    })


    // Host.find().then(data => res.status(200).json({data, OK:true})).catch(error => res.status(400).json({error, OK:false}))
})

module.exports = app