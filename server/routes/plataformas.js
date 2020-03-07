const express = require('express')
const app = express()
const Plataforma = require('../models/plataformas')

app.get('/', (req, res) => {
    Plataforma.find({}, 'plataforma img servicios_administrados').then(plataformas => {
        res.status(200).json({OK:true, plataformas})
    }).catch(err => {
        res.status(400).json({OK:false, errors: { msg:'No se puede encontrar plataformas', err}})
    })
})

app.get('/:id', (req, res) => {
    const { id } = req.params
    Plataforma.findById(id).then(plataforma => {
        res.status(200).json({OK:true, plataforma})
    }).catch(err => {
        res.status(400).json({OK:false, errors: { msg:'No se puede encontrar plataformas', err}})
    })
})

app.patch('/:id', (req, res) => {
    Plataforma.updateOne({_id: req.params.id}, {plataforma:req.body.nombre}).then(data => {
        res.status(200).json({OK:true, data})
    }).catch(err => {
        res.status(400).json({OK:false, err})
    })
})


app.post('/', (req, res) => {
    let plataforma = new Plataforma({plataforma:req.body.nombre, img:req.body.img}) 
    plataforma.save().then(data => {
        res.status(200).json({OK:true, data})
    }).catch(err => {
        res.status(400).json({OK:false, err})
    })
})

app.patch('/controles/:id', (req, res) => {
    Plataforma.findById(req.params.id).then(plataforma => {
        plataforma.controles = [ ...req.body.controles ]
        return plataforma.save()
    }).then((contratoActualizado) => {
        res.status(200).json({OK:true, contratoActualizado})
    }) .catch((error) => {
        res.status(400).json({OK:false, error})
    })
})
 

module.exports = app 