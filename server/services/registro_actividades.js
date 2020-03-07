const cron = require('node-cron');
const RegistroActividad = require('../models/registro_actividad')
const Analista = require('../models/analista')

cron.schedule('0 0 7 * * *', () => {
    Analista.find({ registra: true }).select('_id').then(data => {
        let registros = RegistroActividad.registroDiario(data)
        return RegistroActividad.insertMany(registros)
    }).then(data => {
        console.log('Actividades registrada con éxito')
        return
    }).catch(err => {
        console.log('No se pudieron registrar las actividades diarias')
        return
    })
});

cron.schedule('0 0 13 * * *', () => {
    Analista.find({ registra: true }).select('_id').then(data => {
        let registros = RegistroActividad.registroDiario(data)
        return RegistroActividad.insertMany(registros)
    }).then(data => {
        console.log('Actividades registrada con éxito')
        return
    }).catch(err => {
        console.log('No se pudieron registrar las actividades diarias')
        return
    })
});