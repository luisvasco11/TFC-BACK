const express = require('express')
const app = express()
const conexion = require('../db/conexion')
const Analista = require('../models/analista')

app.get('/', (req, res) => {
    Analista.find().then(analistas => {
        res.status(200).json({OK:true, analistas})
    }) .catch((err) => {
        res.status(400).json({OK:false, err})
    })
})

app.get('/:id', (req, res) => {
    const { id } = req.params 
    Analista.findById(id).populate({path:'contrato'}).then(analista => {
        res.status(200).json({OK:true, analista})
    }).catch(error => {
        res.status(400).json({OK:true, error})
    })
})

app.get('/:id/:cedula', async (req, res) => {
    const { id, cedula } = req.params 
    let sql = 'SELECT * FROM VAUSENTISMOSPATI WHERE cedula=:nombre'
    const data = await conexion.open(sql, [cedula], false, 'response')

    if(data.result.length === 0){
        return res.status(200).json({OK:true, analista:null, data})
    }

    const analista = await Analista.findOne({cedula})

    if( !analista ) {
        crearAnalista(data, res)
    }else {
        res.status(200).json({OK:true, analista, data})
        
        //actualizarAnalista(cedula, data.result)
    }


    //res.status(200).json({OK:true, analista, data})

    // Analista.findOne({cedula:cedula}).populate({path:'contrato'}).then(analista => {
    //     res.status(200).json({OK:true, analista, data})
    // }).catch(error => {
    //     res.status(400).json({OK:true, error})
    // })
})

app.patch('/:analistaId', (req, res) => {
    Analista.findById(req.params.analistaId).then((analista) => {
        analista.celular = parseInt(req.body.celular)
        return analista.save()
    }).then(analistaActualizado => {
        res.status(200).json({OK:true, analistaActualizado})
    }) .catch((err) => {
        res.status(400).json({OK:false, err})
    })
})

app.patch('/', (req, res) => {
    const nuevoAnalista =  req.body.analista
    Analista.updateOne({ _id: req.body.analista._id }, nuevoAnalista).then(data => {
        res.status(200).json({OK:true, data, _id: req.body.analista._id})
    }).catch(err => {
        res.status(400).json({OK:false})
    })
})


const crearAnalista = async ( analista, res ) => {
    
    const params = {
        cedula : analista.result[0][0],
        nombre : analista.result[0][1],
        apellidos:".",
        email:'pendientevistaausentismo@arus.com.co',
        plataforma:[],
        cargo:analista.result[0][3],
        lider:"5c4f529ee93698d60a28e1e3",
        proyecto:'PENDIENTE',
        centro_costos: analista.result[0][17],
        img:"no-image-icon-1234567890.png",
        registra:false,
        contrato:[],
        celular:0,
        grupo_permisos:"5d5ead965c404589b74b1251",
        rol:'ANALISTA'
    } 

    const nuevoAnalista = new Analista(params)

    try {
        const analistaGuardado = await nuevoAnalista.save()
        res.status(200).json({ OK:true, analista: analistaGuardado, data: analista })
    } catch (e) {
        res.status(400).json({OK:false, e})
    }
} 

const actualizarAnalista = ( cedulaAnalista, analista ) => {

}


module.exports = app