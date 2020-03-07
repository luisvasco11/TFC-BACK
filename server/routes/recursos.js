const express = require('express')
const Recurso = require('../models/recursos')
const app = express()


app.get('/:recurso', (req, res) => {
    Recurso.find()
        .then(recursos => {
            let resultado = null
            switch (req.params.recurso) {
                case 'horarios':
                    resultado = recursos[0].horarios;
                    break;
                case 'servicios':
                    resultado = recursos[0].servicios;
                    break;
                case 'ambiente':
                    resultado = recursos[0].ambiente;
                    break;
                case 'umbrales':
                    resultado = recursos[0].umbrales;
                    break;
                case 'dispositivos':
                    resultado = recursos[0].tipo_dispositivos;
                    break;
            }
            res.status(200).json({ OK: true, resultado })
        }).catch(error => {
            res.status(400).json({ OK: false, error })
        })
})

app.get('/', (req, res) => {
    Recurso.find().then((recursos) => {
        res.status(200).json({ OK: true, recursos })
    }).catch((error) => {
        res.status(400).json({ OK: false, error })
    });
})

module.exports = app