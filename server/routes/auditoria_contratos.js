const express = require('express')
const AuditoriaContrato = require('../models/auditoria_contratos')
const app = express()

app.get('/', (req, res) => {
    AuditoriaContrato.find().then(data => {
        res.status(200).json(data)
    }).catch(err => res.status(400).send(err))
})

app.get('/validar/:contrato/:control/:mes/:anio', (req, res) => {
    const { contrato, control, mes, anio } = req.params
    AuditoriaContrato.findOne({
        $and: [ { contrato: contrato}, {control:control}]}).then(control => {
            if(!control){
                return res.status(200).json({OK:true, existeControl:false, accion:'crear'})
            }
            res.status(200).json({OK:true, existeControl:true, accion:'actualizar'})
        }).catch(err => res.status(400).json({OK:false, err}))
})

app.post('/', (req, res) => {
    const auditoriaContrato = new AuditoriaContrato(req.body)
    AuditoriaContrato.find().then(data => {
        res.status(200).json(data)
    }).catch(err => res.status(400).send(err))

    // auditoriaContrato.save().then(data => {
    //     res.status(200).json({OK:200, data})
    // }).catch(error => {
    //     res.status(400).json({OK:false, error})
    // })
})

app.patch('/', (req, res) => {

    const auditoriaContrato = new AuditoriaContrato(req.body)

    AuditoriaContrato.find().then(data => {
        res.status(200).json(data)
    }).catch(err => res.status(400).send(err))
})

module.exports = app