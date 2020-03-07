const express = require('express')
const app = express()
const Escalamiento = require('../models/escalamiento')
const Analista = require('../models/analista')

// app.post('/', (req, res) => {
//     let escalamiento = new Escalamiento(escalamietoGrande)
//     escalamiento.save().then(data => {
//         res.status(200).json({OK:true})
//     }).catch(err => {
//         res.status(400).json({OK:false})
//     })
// })

app.post('/', async (req, res) => {
    const { escalamiento } = req.body
    const hayEscalamiento = await Escalamiento.findOne({
        $and: [
            { plataforma: escalamiento.plataforma }, 
            { servicioAdministrado: escalamiento.servicioAdministrado },
            { contrato:escalamiento.contrato}
        ]})
    if(!hayEscalamiento){
        return crearEscalamiento(escalamiento, res)
    }else{
        actualizarEscalamiento(hayEscalamiento, escalamiento, res)
    }
})

app.get('/:contrato/:plataforma', (req, res) => {

    const plataforma = req.params.plataforma.split('-')[0]
    const servicioAdministrado = req.params.plataforma.split('-')[1]
    Escalamiento.find({
        $and: [
            { plataforma }, 
            { servicioAdministrado },
            { contrato:req.params.contrato}
        ]}).populate('esquema.analista').exec().then(escalamiento => {
        res.status(200).json({OK:true, escalamiento})
    }).catch(err => {
        res.status(400).json({OK:false, err})
    })
})

const crearEscalamiento = async (escalamientoParametros, res) => {
    console.log('Creando')
    const escalamiento = new Escalamiento(escalamientoParametros)
    const escalamientoCreado =  await escalamiento.save()
    res.send({OK:true, escalamiento:escalamientoCreado})
} 

const actualizarEscalamiento = async ({id}, nuevoEscalamiento, res) => {
    console.log('Actualizando')
    const escalamientoActualizado = await Escalamiento.findByIdAndUpdate(id, nuevoEscalamiento, {runValidators:true, new:true})
    return res.send({OK:true, escalamiento:escalamientoActualizado})
} 

module.exports = app