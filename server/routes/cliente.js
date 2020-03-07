const express = require('express')
const app = express()
const Cliente = require('../models/cliente')


// app.post('/', async (req, res) => {

//     const { clientes } = req.body
//     //const nuevoCliente = new Cliente(cliente)
    
//     try {
//         // const clienteGuardado = await nuevoCliente.save()

//         const clienteGuardado = await Cliente.insertMany(clientes)

//         res.status(200).send({OK:true, clientes: clienteGuardado})
//     }catch(error){
//         res.status(400).send({error, OK:true})
//     }

// })

app.post('/', async (req, res) => {

    const { cliente } = req.body
    const nuevoCliente = new Cliente(cliente)
    
    try {
        const clienteGuardado = await nuevoCliente.save()
        res.status(200).send({OK:true, clienteGuardado})
    }catch(error){
        res.status(400).send({error, OK:true})
    }

})

app.get('/', async (req, res) => {

    try {
        const cliente = await Cliente.find().sort({ cliente: 1 })
        if(!cliente){
            return res.status(404).send({OK:false, error})
        }
        res.status(200).send({clientes:cliente, OK:true})
    } catch (error) {
        res.status(400).send({OK:false, error})
    }

})

app.get('/:id', async (req, res) => {

    const { id } = req.params

    try {
        const cliente = await Cliente.findById(id).populate('gestionCartera.usuario', 'img nombre')
                                                  .populate('acuerdoPago.usuario', 'img nombre').exec()
        if(!cliente){
            return res.status(404).send({OK:false, error})
        }
        res.status(200).send({cliente, OK:true})
    } catch (error) {
        res.status(400).send({OK:false, error})
    }

})

app.patch('/', async (req, res) => {

    const { cliente } = req.body
    const { _id } = cliente

    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(_id, cliente, { new:true, runValidators:true })
        res.status(200).send({OK:true, clienteActualizado})
    }catch(error){
        res.status(400).send({error, OK:true})
    }

})

app.delete('/:id', async (req, res) => {

    const { id } = req.params

    try {
        const cliente = await Cliente.findByIdAndDelete(id)
        if(!cliente){
            return res.status(404).send({OK:false, error})
        }
        res.status(200).send({cliente, OK:true})
    } catch (error) {
        res.status(400).send({OK:false, error})
    }

})




module.exports = app
