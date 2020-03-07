const express = require('express')
const Iniciativa = require('../models/iniciativas')
const Contrato = require('../models/contrato')
const Analista = require('../models/analista')
const Plataforma = require('../models/plataformas')
const mongoose = require('mongoose')
const app = express()


app.get('/contrato/:contrato', (req, res) => {
    Iniciativa.find({ $and: [{ contrato: req.params.contrato }, { tipo: 1 }] })
        .populate('analista', 'nombre apellidos')
        .populate('contrato', 'contrato')
        .populate('plataforma', 'plataforma img')
        .exec().then(iniciativas => {
            res.status(200).json({ OK: true, iniciativas })
        }).catch(error => {
            res.status(400).json({ OK: false, error })
        })
})
app.get('/reporte/todas', (req, res) => {
    Iniciativa.find({ tipo: 1 })
        .populate({path:'analista', select :'nombre apellidos lider', populate: { path: 'lider', select:'nombre' }})
        .populate('contrato', 'contrato')
        .populate('plataforma', 'plataforma img')
        .exec().then(iniciativas => {
            res.status(200).json({ OK: true, iniciativas })
        }).catch(error => {
            res.status(400).json({ OK: false, error })
        })
})

app.get('/contrato/excelencia/:contrato', (req, res) => {
    Iniciativa.find({ $and: [{ contrato: req.params.contrato }, { tipo: 2 }] })
        .populate('analista', 'nombre apellidos')
        .populate('contrato', 'contrato')
        .populate('plataforma', 'plataforma img')
        .exec().then(iniciativas => {
            res.status(200).json({ OK: true, iniciativas })
        }).catch(error => {
            res.status(400).json({ OK: false, error })
        })
})

app.get('/contrato/:contrato/plataforma/:plataforma', (req, res) => {
    Iniciativa.find({ $and: [{ contrato: req.params.contrato }, { tipo: 2 }, { plataforma: req.params.plataforma }] })
        .populate('analista', 'nombre apellidos')
        .populate('contrato', 'contrato')
        .populate('plataforma', 'plataforma img')
        .exec().then(iniciativas => {
            res.status(200).json({ OK: true, iniciativas })
        }).catch(error => {
            res.status(400).json({ OK: false, error })
        })
})

app.get('/iniciativa/:id', (req, res) => {
    res.status(400).json({ OK: true })
})

app.get('/:id', (req, res) => {
    Iniciativa.findById(req.params.id)
        .populate('analista', 'nombre apellidos')
        .populate('contrato', 'contrato img')
        .populate('plataforma', 'plataforma img')
        .exec().then(iniciativa => {
            res.status(200).json({ OK: true, iniciativa })
        }).catch(error => {
            res.status(400).json({ OK: false, error })
        })
})

app.post('/', (req, res) => {
    let iniciativa = new Iniciativa(req.body.iniciativa)
    iniciativa.save().then(iniciativa => {
        res.status(200).json({ OK: true, iniciativa })
    }).catch(error => {
        res.status(400).json({ OK: true, error })
    })
})

app.patch('/:id', (req, res) => {
    let actividad = req.body.actividad
    actividad._id = mongoose.Types.ObjectId();

    Iniciativa.findById(req.params.id).then((iniciativa) => {
        iniciativa.actividades.push(actividad)
        return iniciativa.save()
    }).then((iniciativaActualizada) => {
        res.status(200).json({ OK: true, iniciativaActualizada })
    }).catch((error) => {
        res.status(400).json({ OK: false, error })
    })
})

app.patch('/actividad/:actividad', (req, res) => {
    Iniciativa.updateOne({ "actividades._id": req.params.actividad },
     { $set: { "actividades.$.estado": req.body.estado } }).then(data => {
        res.status(200).json({ OK: true, data, estado: req.body.estado })
    }).catch(err => {
        res.status(400).json({ OK: false, err })
    })
})

app.patch('/actividad/una/:actividad_id', (req, res) => {
    const { actividad_id } = req.params
    const { actividad } = req.body
    Iniciativa.updateOne({"actividades._id":actividad_id}, {$set : {"actividades.$": actividad}}).then(iniciativaActualizada => {
        return Iniciativa.findOne({"actividades._id":actividad_id})
    }).then((iniciativa) => {
        res.send({id:req.params.actividad_id, OK:true, iniciativa})
    }).catch((error) => {
        res.status(200).json({OK:false, error})
    })
})

app.delete('/actividad/una/:actividad_id/:analista_id', (req, res) => {
    const { actividad_id, analista_id } = req.params
    Iniciativa.updateOne({"actividades._id":actividad_id}, {$set : {"actividades.$.estaEliminada": true, "actividades.$.analistaElimina":analista_id} }).then(iniciativaActualizada => {
        return Iniciativa.findOne({"actividades._id":actividad_id})
    }).then((iniciativa) => {
        res.send({id:req.params.actividad_id, OK:true, iniciativa})
    }).catch((error) => {
        res.status(200).json({OK:false, error})
    })
})



module.exports = app
