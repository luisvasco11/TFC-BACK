const express = require('express')
const Schema = require('mongoose')
const _ = require('lodash')
const app = express()
const RegistroActividad = require('../models/registro_actividad')
const Contrato = require('../models/contrato')
const Actividad = require('../models/actividad')
const Plataforma = require('../models/plataformas')
const Analista = require('../models/analista')
 

app.get('/:id', (req, res) => {

    let analista_id = req.params.id

    // RegistroActividad.find({analista:analista_id}, 'actividad contador')
    // .populate('actividad')
    // .exec().then( (data) => {
    //     res.status(200).json(data)
    // }).catch( (error) => {
    //     res.status(400).json(error)
    // })

    RegistroActividad.aggregate([
        { $match: { analista: { $eq: Schema.Types.ObjectId(analista_id) } } },
        { $group: { _id: "$actividad", total: { $sum: "$contador" } } },
        { $sort: { total: -1 } },
        { $limit: 10 },
        { $lookup: { from: 'actividad', localField: '_id', foreignField: '_id', as: 'actividad' } }
    ]).then(data => {
        res.status(200).json({ OK: true, data })
    }).catch(e => res.json(e).status(404))

})

app.post('/', (req, res) => {
    let checked = true
    checked = req.body.checked
    let params = _.pick(req.body, ['contrato', 'actividad', 'analista', 'ticket','descripcion'])
    const date1 = new Date().getTime()
    if(!checked){
        params.fecha = new Date( date1 - 5 * 60 * 60 * 1000 )
    }else{
        params.fecha = new Date( date1 - 29 * 60 * 60 * 1000 )
    }

    let registroActividad = new RegistroActividad(params);

    RegistroActividad.find({ "actividad": registroActividad.actividad }).sort({ contador: -1 }).limit(1).exec()
        .then((data) => {
            if (data.length === 0) {
                return registroActividad.save()
            } else {
                let contador = data[data.length - 1].contador = data[data.length - 1].contador + 1
                registroActividad.contador = contador
                return registroActividad.save()
            }
        }).then(actividad => {
            res.status(200).json(actividad)
        }).catch(e => {
            res.status(400).json(e)
        })
})

app.post('/ausentismos/analista/:analista', (req, res) => {
    const date1 = new Date().getTime()
    let fecha = new Date( date1 - 5 * 60 * 60 * 1000 )
    let actividad = ''
    if (req.body.tipoAusentismo === 'EventoCorporativo'){
        actividad = "5da73f8ed26201387c0ea33f"
    }
    else if (req.body.tipoAusentismo === 'DescansoPorTurnos'){
        actividad = "5da73f8ed26201387c0ea340"
    }
    else if (req.body.tipoAusentismo === 'Suspensión'){
        actividad = "5da73f8ed26201387c0ea341"
    }else if (req.body.tipoAusentismo === 'Vacaciones'){
        actividad = "5cd5f7ef40485e2e8949323b"
    }

    let registro = new RegistroActividad({ actividad, analista: req.params.analista, contrato: "5cd5f6f040485e2e89493043", fecha: fecha, ticket: '', contador: '', fecha_inicio: req.body.fechaInicio, fecha_fin: req.body.fechaFin, tipo: req.body.tipoAusentismo })
    registro.save().then(data => res.status(200).json({ OK: true, data })).catch(error => res.status(400).json({ OK: false, error }))
})

app.get('/analista/:id', (req, res) => {
    let analistaId = req.params.id
    RegistroActividad.find({ analista: analistaId })
        .populate('analista', 'cedula nombre apellidos email cargo')
        .populate('actividad')
        .populate('contrato', 'contrato')
         .exec().then(data => {
            res.status(200).json(data)
        }).catch(error => {
            res.status(400).json(error)
        })
})

app.get('/actividad/plataforma/kjd',(req,res)=>{
    Actividad.find()
    .then(data =>{
        res.status(200).json({OK:true,data})
    }).catch(err =>{
        res.status(400).json({OK:false,err})
    })
})


app.get('/analista/todos/:id/:fechaInicio/:fechaFin/:tipo', (req, res) => {
    
    const { id, fechaInicio, fechaFin, tipo } = req.params
    const tipoInforme = parseInt(tipo.split('-')[0])
    const parametro = tipo.split('-')[1]
    const fechaIni = new Date(fechaInicio)
    const fechaFinal = new Date(fechaFin)

    // RegistroActividad.find({
    //     $and: [
    //         { fecha: { $gt: fechaIni} }, 
    //         { fecha: { $lt: fechaFinal} }
    //     ]
    // })
    // .populate('analista', 'cedula nombre apellidos email cargo')
    // .populate('actividad')
    // .populate('contrato', 'contrato')
    // .exec()
    // .then(data => {
    //     res.status(200).json(data)
    // }).catch(error => {
    //     res.status(400).json(error)
    // })
         
    switch (tipoInforme) {
        case 0:
            Analista.find({lider:id}).then((analistas) => {
                RegistroActividad.find({
                    $and: [
                        { $or : getIdAnalistas(analistas) }, 
                        { fecha: { $gt: fechaIni} }, 
                        { fecha: { $lt: fechaFinal} }
                    ]
                })
                .populate('analista', 'cedula nombre apellidos email cargo')
                .populate('actividad')
                .populate('contrato', 'contrato')
                .exec()
                .then(data => {
                    res.status(200).json(data)
                }).catch(error => {
                    res.status(400).json(error)
                })
                
            }).catch((error) => {
                res.status(400).json({OK:false, error})
            })
            break;
        case 1:
            RegistroActividad.find({
                $and: [
                    { $or : [ { analista : parametro } ] }, 
                    { fecha: { $gt: fechaIni} }, 
                    { fecha: { $lt: fechaFinal} }
                ]
            })
            .populate('analista', 'cedula nombre apellidos email cargo')
            .populate('actividad')
            .populate('contrato', 'contrato')
            .exec()
            .then(data => {
                res.status(200).json(data)
            }).catch(error => {
                res.status(400).json(error)
            })
            break;
        case 2:
            RegistroActividad.find({
                $and: [
                    { $or : [ { contrato:parametro } ] }, 
                    { fecha: { $gt: fechaIni} }, 
                    { fecha: { $lt: fechaFinal} }
                ]
            })
            .populate('analista', 'cedula nombre apellidos email cargo')
            .populate('actividad')
            .populate('contrato', 'contrato')
            .exec()
            .then(data => {
                res.status(200).json(data)
            }).catch(error => {
                res.status(400).json(error)
            })
            break;
    
        default:
            break;
    }

})

app.get('/contrato/todos/:id', (req, res) => {
    RegistroActividad.find().select('contrato')
        .populate('contrato', 'contrato')
        .then(data => {
            res.status(200).json(data)
        }).catch(error => {
            res.status(400).json(error)
        })
})
app.get('/registro/todos/:id', (req, res) => {
    RegistroActividad.find({ contrato: '5c6c79ff9defeaef6ce2c812' })
        .populate('contrato', 'contrato')
        .populate('actividad')
        .populate('analista', 'cedula nombre apellidos email cargo')
        .then(data => {
            res.status(200).json(data)
        }).catch(error => {
            res.status(400).json(error)
        })
})
app.get('/actividad/todos/:id', (req, res) => {
    Actividad.find()
        .then(data => {
            res.status(200).json(data)
        }).catch(error => {
            res.status(400).json(error)
        })
})

const getIdAnalistas = (analistas) => {
    return analistas.map((analista) => {
        return {
            analista : analista._id
        }
    })
}

module.exports = app
