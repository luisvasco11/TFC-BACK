const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const fs = require('fs')
const Analista = require('../models/analista')
const BancoProyecto = require('../models/banco-proyectos')
const Incapacidad = require('../models/incapacidad')
const AuditoriaContrato = require('../models/auditoria_contratos')
app.use(fileUpload())

app.patch('/:id', (req, res, next) => {

    let id = req.params.id
    if(!req.files){
        return res.status(400).json({
            OK:false,
            mensaje:'No hay archivos',
            error: { mensaje:'Debe seleccionar una imagen' }
        })
    }

    let archivo = req.files.imagen
    let nombreCortado = archivo.name.split('.')
    let extensionArchivo = nombreCortado[nombreCortado.length - 1]

    // Las extensiones que aceptamos
    let extensoinesValidas = ['png', 'jpg', 'jpeg']

    if(extensoinesValidas.indexOf(extensionArchivo) < 0){
        return res.status(400).json({
            OK:false,
            mensaje:'Extensión no válida',
            error: {mensaje:'Las extensiones válidad son ' + extensoinesValidas.join(', ')}
        })
    }

    //nombre de archivo personalizado
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`
    var path = `./server/uploads/analistas/${nombreArchivo}`

    
    archivo.mv(path, err => {
        if(err){
            return res.status(500).json({
                OK:false,
                mensaje:'Error al mover el archivo',
                errors: err
            })
        }
        subirImagen(id, nombreArchivo, res)
    })
})

app.patch('/control/:id', (req, res, next) => {

    let id = req.params.id
    if(!req.files){
        return res.status(400).json({
            OK:false,
            mensaje:'No hay archivos',
            error: { mensaje:'Debe seleccionar una imagen' }
        })
    }

    let archivo = req.files.imagen
    let nombreCortado = archivo.name.split('.')
    let extensionArchivo = nombreCortado[nombreCortado.length - 1]

    // Las extensiones que aceptamos
    let extensoinesValidas = ['png', 'jpg', 'jpeg', 'pdf', 'xlsx', 'xls', 'pptx', 'ppt', 'doc', 'docx']

    if(extensoinesValidas.indexOf(extensionArchivo) < 0){
        return res.status(400).json({
            OK:false,
            mensaje:'Extensión no válida',
            error: {mensaje:'Las extensiones válidad son ' + extensoinesValidas.join(', ')}
        })
    }

    //nombre de archivo personalizado
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`
    var path = `./server/uploads/controles/${nombreArchivo}`

    
    archivo.mv(path, err => {
        if(err){
            return res.status(500).json({
                OK:false,
                mensaje:'Error al mover el archivo',
                errors: err
            })
        }
        subirImagen(id, nombreArchivo, res)
    })
})


function subirImagen(id, nombreArchivo, res){

    Analista.findById(id).then((analista) =>{
        let pathViejo = `./server/uploads/controles/${analista.img}`

        if(fs.existsSync(pathViejo)){
            fs.unlink(pathViejo, (err => {
                return err
            }))
        }

        analista.img = nombreArchivo
        
        return analista.save()

    }).then((usuarioActualizado) => {
        res.status(200).json({
            OK:true,
            mensaje:'Imagen de usuario actualizada',
            usuario:usuarioActualizado
        })
    }).catch( (err) => {
        res.status(404).json({err, mensaje:'Este el error'})
    })
}

app.post('/', (req, res, next) => {
    let body = JSON.parse(req.body.proyecto)
    let id = body.analista
    let contrato = body.contrato
    let descripcion = body.descripcion

    if(!req.files){
        return res.status(400).json({
            OK:false,
            mensaje:'No hay archivos',
            error: { mensaje:'Debe seleccionar un archivo' }
        })
    }

    let archivo = req.files.archivo
    let nombreCortado = archivo.name.split('.')
    let nombreArchivoO = nombreCortado[0]
    let extensionArchivo = nombreCortado[nombreCortado.length - 1]

    // Las extensiones que aceptamos
    let extensoinesValidas = ['png', 'jpg', 'jpeg', 'pdf', 'xlsx', 'xls', 'pptx', 'ppt', 'doc', 'docx']

    if(extensoinesValidas.indexOf(extensionArchivo) < 0){
        return res.status(400).json({
            OK:false,
            mensaje:'Extensión no válida',
            error: {mensaje:'Las extensiones válidad son ' + extensoinesValidas.join(', ')}
        })
    }

    //nombre de archivo personalizado
    let nombreArchivo = `${nombreArchivoO}-${id}-${new Date().getMilliseconds()}.${extensionArchivo}`
    var path = `./server/uploads/banco-proyectos/${nombreArchivo}`

    
    archivo.mv(path, err => {
        if(err){
            return res.status(500).json({
                OK:false,
                mensaje:'Error al mover el archivo',
                errors: err
            })
        }
        subirProyecto(id, nombreArchivo, contrato, descripcion, res)
    })
})

app.post('/incapacidad/analista', (req, res) => {
    let { analista, diagnostico, naturaleza, tipo, fechaInicio, fechaFin } = JSON.parse(req.body.incapacidad)
    /*let id = body.analista
    let contrato = body.contrato
    let descripcion = body.descripcion*/

    if(!req.files){
        return res.status(400).json({
            OK:false,
            mensaje:'No hay archivos',
            error: { mensaje:'Debe seleccionar un archivo' }
        })
    }

    let archivo = req.files.incapacidadArchivo
    let nombreCortado = archivo.name.split('.')
    let nombreArchivoO = nombreCortado[0]
    let extensionArchivo = nombreCortado[nombreCortado.length - 1]

    // Las extensiones que aceptamos
    let extensoinesValidas = ['png', 'jpg', 'jpeg', 'pdf', 'xlsx', 'xls', 'pptx', 'ppt', 'doc', 'docx']

    if(extensoinesValidas.indexOf(extensionArchivo) < 0){
        return res.status(400).json({
            OK:false,
            mensaje:'Extensión no válida',
            error: {mensaje:'Las extensiones válidad son ' + extensoinesValidas.join(', ')}
        })
    }

    //nombre de archivo personalizado
    let nombreArchivo = `incapacidad-${analista}-${new Date().getMilliseconds()}.${extensionArchivo}`
    var path = `./server/uploads/incapacidades/${nombreArchivo}`

    
    archivo.mv(path, err => {
        if(err){
            return res.status(500).json({
                OK:false,
                mensaje:'Error al mover el archivo',
                errors: err
            })
        }
        subirIncapacidad(analista, diagnostico, naturaleza, tipo, fechaInicio, fechaFin, nombreArchivo, res)
    })
})

app.post('/control/auditoria', (req, res) => {
    
    let body = JSON.parse(req.body.control)
    if(!req.files){
        return res.status(400).json({
            OK:false,
            mensaje:'No hay archivos',
            error: { mensaje:'Debe seleccionar un archivo' }
        })
    }
    const nombreCarpeta = body.nombre.split(" ").join("_")
    const archivo = req.files.archivo_auditoria
    const nombreCortado = archivo.name.split('.')
    const nombreArchivoO = nombreCortado[0]
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]
    let extensoinesValidas = ['png', 'jpg', 'jpeg', 'pdf', 'xlsx', 'xls', 'pptx', 'ppt', 'doc', 'docx']

    if(extensoinesValidas.indexOf(extensionArchivo) < 0){
        return res.status(400).json({
            OK:false,
            mensaje:'Extensión no válida',
            error: { mensaje:'Las extensiones válidad son ' + extensoinesValidas.join(', ')}
        })
    }
    let path = `./server/uploads/auditorias/${body.contrato}`
    if(!fs.existsSync(path)){
        fs.mkdirSync(path)

        fs.mkdirSync(`${path}/${body.respuestas[0].anio}`)

        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/0`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/1`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/2`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/3`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/4`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/5`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/6`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/7`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/8`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/9`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/10`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/11`)

        let nombreArchivo = `${nombreArchivoO}-${new Date().getTime()}.${extensionArchivo}`
        let pathParaGuardar = `${path}/${body.respuestas[0].anio}/${body.respuestas[0].mes}/${nombreArchivo}`
        body.respuestas[0].ruta_archivo = nombreArchivo
        archivo.mv(pathParaGuardar, err => {
            if(err){
                return res.status(500).json({
                    OK:false,
                    mensaje:'Error al mover el archivo',
                    errors: err
                })
            }
            subirAditoria(body, res)
        })

    }else {
        let nombreArchivo = `${nombreArchivoO}-${new Date().getTime()}.${extensionArchivo}`
        let pathParaGuardar = `${path}/${body.respuestas[0].anio}/${body.respuestas[0].mes}/${nombreArchivo}`
        body.respuestas[0].ruta_archivo = nombreArchivo
        archivo.mv(pathParaGuardar, err => {
            if(err){
                return res.status(500).json({
                    OK:false,
                    mensaje:'Error al mover el archivo',
                    errors: err
                })
            }
            subirAditoria(body, res)
        })
    }
})

app.patch('/auditoria/control', (req, res) => {
    let body = JSON.parse(req.body.control)
    let respuesta = JSON.parse(req.body.respuesta)
    if(!req.files){
        return res.status(400).json({
            OK:false,
            mensaje:'No hay archivos',
            error: { mensaje:'Debe seleccionar un archivo' }
        })
    }
    const nombreCarpeta = body.nombre.split(" ").join("_")
    const archivo = req.files.archivo_auditoria
    const nombreCortado = archivo.name.split('.')
    const nombreArchivoO = nombreCortado[0]
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]
    let extensoinesValidas = ['png', 'jpg', 'jpeg', 'pdf', 'xlsx', 'xls', 'pptx', 'ppt', 'doc', 'docx']

    if(extensoinesValidas.indexOf(extensionArchivo) < 0){
        return res.status(400).json({
            OK:false,
            mensaje:'Extensión no válida',
            error: { mensaje:'Las extensiones válidad son ' + extensoinesValidas.join(', ')}
        })
    }
    let path = `./server/uploads/auditorias/${body.contrato}`
    if(!fs.existsSync(path)){
        fs.mkdirSync(path)

        fs.mkdirSync(`${path}/${body.respuestas[0].anio}`)

        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/0`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/1`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/2`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/3`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/4`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/5`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/6`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/7`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/8`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/9`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/10`)
        fs.mkdirSync(`${path}/${body.respuestas[0].anio}/11`)

        let nombreArchivo = `${nombreArchivoO}-${new Date().getTime()}.${extensionArchivo}`
        let pathParaGuardar = `${path}/${respuesta.anio}/${respuesta.mes}/${nombreArchivo}`
        respuesta.ruta_archivo = nombreArchivo
        archivo.mv(pathParaGuardar, err => {
            if(err){
                return res.status(500).json({
                    OK:false,
                    mensaje:'Error al mover el archivo',
                    errors: err
                })
            }
            actualizarAditoria(body, res)
        })

    }else {
        let nombreArchivo = `${nombreArchivoO}-${new Date().getTime()}.${extensionArchivo}`
        let pathParaGuardar = `${path}/${respuesta.anio}/${respuesta.mes}/${nombreArchivo}`
        respuesta.ruta_archivo = nombreArchivo
        archivo.mv(pathParaGuardar, err => {
            if(err){
                return res.status(500).json({
                    OK:false,
                    mensaje:'Error al mover el archivo',
                    errors: err
                })
            }
            actualizarAditoria(body, respuesta,  res)
        })
    }
})

function subirAditoria( body, res ){
    const auditoriaContrato = new AuditoriaContrato(body)
    auditoriaContrato.save().then(data => {
        res.status(200).json({OK:200, data})
    }).catch(error => {
        res.status(400).json({OK:false, error})
    })
}
function actualizarAditoria( body, respuesta, res ) {

    AuditoriaContrato.findOne({ $and: [ 
                                    { contrato: body.contrato}, 
                                    { control: body.control }] }).then(control => {
            if(!control){
                return res.status(200).json({OK:true, existeControl:false, accion:'crear'})
            }
            control.respuestas.push(respuesta)
            return control.save()
        }).then(controlActualizado => {
            res.status(200).json({OK:true, controlActualizado})
        }).catch(err => res.status(400).json({OK:false, err}))
    
    // const auditoriaContrato = new AuditoriaContrato(body)
    // auditoriaContrato.save().then(data => {
    //     res.status(200).json({OK:200, data})
    // }).catch(error => {
    //     res.status(400).json({OK:false, error})
    // })
}


function subirProyecto(id, nombreArchivo, contrato, descripcion, res){
    let proyecto = new BancoProyecto({'contrato':contrato, analista:id, 'descripcion':descripcion, 'ruta_archivo':nombreArchivo})

    proyecto.save().then ( (data) => {
        res.json({OK:true, msg:'Proyecto ingresado correctamente', data})
    }).catch( (err) => {
        res.json({OK:false, msg:'Error al ingresar el proyecto', err})
    })
}

function subirIncapacidad(analista, diagnostico, naturaleza, tipo, fechaInicio, fechaFin, nombreArchivo, res){
    let proyecto = new Incapacidad({'analista':analista, 'diagnostico':diagnostico, 'naturaleza':naturaleza, 'tipo':tipo, 'fechaInicio':fechaInicio, 'fechaFin':fechaFin, 'file':nombreArchivo})
    proyecto.save().then ( (data) => {
        res.json({OK:true, msg:'Proyecto ingresado correctamente', data})
    }).catch( (err) => {
        res.json({OK:false, msg:'Error al ingresar el proyecto', err})
    })
}

module.exports = app