const express = require('express')
const app = express()
const Contrato = require('../models/contrato')
const Analista = require('../models/analista')
const Plataforma = require('../models/plataformas')
const Pregunta = require('../models/preguntas')
const Servicio = require('../models/servicio')
const path = require('path')
const { generales } = require('../data/data')
const AuditoriaContrato = require('../models/auditoria_contratos')
const ObjectId = require('mongoose').Types.ObjectId; 


app.get('/', (req, res) => {
    Contrato.find({Estado:'Abierto'}).populate('plataforma', 'plataforma img')
    .select('contrato centro_costos img plataforma procesos generales controles lider').then( (contratos) => {
        res.status(200).json({OK:true, contratos})
    }).catch( (err) => {
        res.status(400).json({OK:false, err})
    })
})

app.get('/mis/contratos/:analista', (req, res) => {
    const { analista } = req.params
    Contrato.find({$and: [{Estado:'Abierto'}, { lider: analista }]}).populate('plataforma', 'plataforma img')
    .select('contrato centro_costos img plataforma procesos generales controles').then( (contratos) => {
        res.status(200).json({OK:true, contratos})
    }).catch( (err) => {
        res.status(400).json({OK:false, err})
    })
})


app.patch('/procesos/:id', (req, res) => {
    Contrato.update({"procesos.controles.control": req.body.proceso.control },
        { $set: {"procesos.$[proceso].controles.$[control].respuesta": req.body.proceso.respuesta }}).then(data => {
            
        res.status(200).json({ OK: true, data })
    }).catch(err => {
        res.status(400).json({ OK: false, err })
    })
    
})

//app.get('/analista/:id', (req, res) => {
//    Analista.find()
//    .populate('contrato', 'contrato centro_costos')
//    .select(' contrato').then( (analista) => {
//        res.status(200).json({OK:true, analista})
//    }).catch( (err) => {
//        res.status(400).json({OK:false, err})
//    })
//})

//app.get('/analista/:id', (req, res) => {
//    Analista.find()
//    .populate('contrato', 'contrato centro_costos')
//    .select(' contrato').then( (analista) => {
//        res.status(200).json({OK:true, analista})
//    }).catch( (err) => {
//        res.status(400).json({OK:false, err})
//    })
//})


// .populate({path:'analista', select :'nombre apellidos lider', populate: { path: 'lider', select:'nombre' }})

app.get('/:id', (req, res) => {
    let id = req.params.id
    Analista.findById(id).then( ( data ) => {
        let lider_id = data.lider
        return Analista.find({_id:lider_id}, 'contrato').populate({path:'contrato', select:'contrato img plataforma centro_costos', populate:{path:'plataforma', select:'plataforma img'}}).exec()
    }).then( ( data ) => {
        res.status(200).json(data[0].contrato)
    }).catch( (error) => {
        res.status(400).json(error)
    })
})

app.get('/c/interna/:id', (req, res) => {
    const { id } = req.params
    Contrato.findOne({centro_costos:id})
    .populate('plataforma', 'plataforma img')
    .populate("pregunta.pregunta")
    .populate('servicios.servicio')
    .exec()
    .then( (contrato) => {
        res.status(200).json({OK:true, contrato})
    }).catch( (err) => {
        res.status(400).json({OK:false, err})
    })
})

app.get('/c/:id', (req, res) => {
    let id = req.params.id
    Contrato.findById(id)
    .populate('plataforma', 'plataforma img controles')
    .populate("pregunta.pregunta")
    .populate('servicios.servicio')
    .populate('hojaDeVida.servicios.lider', 'nombre img')
    .populate('procesos')
    .exec()
    .then( (contrato) => {
        res.status(200).json({OK:true, contrato})
    }).catch( (err) => {
        res.status(400).json({OK:false, err})
    })
})


app.post('/', (req, res) => {
    req.body.contrato.generales = generales
    let contrato = new Contrato(req.body.contrato)
    contrato.save().then( (data) => {
        res.status(200).json({OK:true, data})
    }).catch( (err) => {
        res.status(400).json({OK:false, err})
    })

})

app.get('/download/:file',(req, res) =>{
    var file = req.params.file;
    var fileLocation = path.join('./server/uploads/banco-proyectos',file);
    res.download(fileLocation, file);
});

app.get('/download/auditorias/:control/:contrato/:anio/:mes',(req, res) => {
    const { anio, mes, contrato, control } = req.params

    AuditoriaContrato.findOne({$and : [ { contrato:contrato }, { control:control } ]}).then(control => {
        const ruta = control.respuestas.find(respuesta => respuesta.mes === mes && respuesta.anio === anio)
        var file = ruta.ruta_archivo;
        var fileLocation = path.join(`./server/uploads/auditorias/${contrato}/${anio}/${mes}`,file);
        res.download(fileLocation, file);
    }).catch(e => {
        res.send()
    })
});

app.get('/download/controles/:file',(req, res) =>{
    var file = req.params.file;
    var fileLocation = path.join('./server/uploads/controles',file);
    res.download(fileLocation, file);
});

app.patch('/host/contrato/:id_contrato',(req,res)=>{
    res.status(200).json({OK:true,contrato:req.params.id_contrato,body:req.body})
});

app.patch('/agregar/servicio/:contrato', (req, res) => {
    Contrato.findById(req.params.contrato).then(contrato => {
        contrato.servicios.push(req.body)
        return contrato.save()
    }).then((contratoActualizado) => {
        res.status(200).json({OK:true, contratoActualizado})
    }) .catch((error) => {
        res.status(400).json({OK:false, error})
    })
})

app.patch('/actualizar/plataformas/:contrato', (req, res) => {
    Contrato.findById(req.params.contrato).then(contrato => {
        contrato.plataforma = [ ...req.body.plataformas ]
        return contrato.save()
    }).then((contratoActualizado) => {
        res.status(200).json({OK:true, contratoActualizado})
    }) .catch((error) => {
        res.status(400).json({OK:false, error})
    })
})

app.patch('/actualizar/disciplinas/:contrato', (req, res) => {
    Contrato.findById(req.params.contrato).then(contrato => {
        contrato.procesos = [...req.body.disciplinas]
        return contrato.save()
    }).then((contratoActualizado) => {
        res.status(200).json({OK:true, contratoActualizado})
    }) .catch((error) => {
        res.status(400).json({OK:false, error})
    })
})

app.put('/', (req, res) => {
    const { _id, lider } = req.body.contrato
    Contrato.findByIdAndUpdate(_id, {$set: {lider: lider}}).then(contrato => {
        res.status(200).json({OK:true, contrato})
    }) .catch((error) => {
        res.status(400).json({OK:false, error})
    })
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const { contrato } = req.body

    if(contrato.editar) {
        limpiarContrato(contrato)
        delete contrato.editar
    }

    try {
        const contratoActualizado = await Contrato.findByIdAndUpdate(id, contrato, { runValidators:true, new:true })
        res.status(200).send({OK:true, cotrato:contratoActualizado})
    } catch (error) {
        res.status(400).send({OK:false, error})
    }
    
})


const limpiarContrato = (contrato) => {
    for(let i = 0; i < contrato.hojaDeVida.servicios.length; i++){
        contrato.hojaDeVida.servicios[i].lider = contrato.hojaDeVida.servicios[i].lider._id
    }
    return contrato
}

module.exports = app
