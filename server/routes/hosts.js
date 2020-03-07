const express = require('express')
const Host = require('../models/hosts')
const Contrato = require('../models/contrato')
const Analista = require('../models/analista')
const Plataforma = require('../models/plataformas')
const mongoose = require('mongoose')
const app = express()


app.post('/', (req, res) => {
    let host = new Host(req.body)
    host.save().then(nuevoHost => {
        res.status(200).json({ OK: true, nuevoHost })
    }).catch( (err) => {
        res.status(400).json({ OK: false, err })
    })
})

app.get('/:id', (req, res) => {

    Host.find({ contrato: req.params.id }).populate({path:'componentes.plataforma'})
    .then(data => {
        res.status(200).json({ OK: true, data })
    }).catch(err => {
        res.status(400).json({ OK: false, err })
    })
})

app.get('/ci/:id', (req, res) => {
    const { id } = req.params
    Host.findById(id).populate({path:'componentes.plataforma', select:'plataforma'}).populate({
        path:"componentes.escalamiento.analista", select:'nombre img email cargo celular'
    })
    .then(data => {
        res.status(200).json({ OK: true, data })
    }).catch(err => {
        res.status(400).json({ OK: false, err })
    })
})

app.get('/', (req, res) => {
    Host.find().distinct('contrato').then(data => {
        res.status(200).json({ OK: true, data })
    }).catch(err => {
        res.status(400).json({ OK: false, err })
    })
})

app.get('/plataforma',(req,res)=>{
    Actividad.find()
    .then(data =>{
        res.status(200).json({OK:true,data})
    }).catch(err =>{
        res.status(400).json({OK:false,err})
    })
})

app.get('/analista/:id', (req, res) => {
    Analista.find()
    .populate('contrato', 'contrato')
    .select('contrato').then( (analista) => {
        res.status(200).json({OK:true, analista})
    }).catch( (err) => {
        res.status(400).json({OK:false, err})
    })
})

app.get('/analista/:id', (req, res) => {
    Analista.find()
        .populate('contrato', 'contrato')
         .exec().then(data => {
            res.status(200).json(data)
        }).catch(error => {
            res.status(400).json(error)
        })
})

app.patch('/:id', async (req, res) => {
    const { id } = req.params
    const { host } = req.body
    try {
        const hostActualizado = await Host.findByIdAndUpdate(id, host, {runValidators:true, new:true})
        res.status(200).send({OK:true, host:hostActualizado})
    } catch (error) {
        res.status(400).send({OK:true, error})
    }
})

app.patch('/:id/:plataformaId', (req, res) => {
    let componente = req.body
    componente._id = mongoose.Types.ObjectId();

    Host.findById(req.params.id).then((host) => {
        host.plataformas.componentes.push(componente)
        return host.save()
    }).then((componenteActualizado) => {
        res.send()
    }).catch((error) => {
        res.status(400).json({ OK: false, error })
    })
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const hostEliminado = await Host.findByIdAndDelete(id)
        res.status(200).send({OK:true, host:hostEliminado})
    }catch(e) {
        res.status(400).json({OK:false, e})
    }
})


module.exports = app


