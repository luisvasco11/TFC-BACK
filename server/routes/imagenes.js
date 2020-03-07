const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.get('/:img', (req, res) => {
    let img = req.params.img

    let pathImagen = path.resolve(__dirname, `../uploads/analistas/${img}`)

    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen)
    }else{
        let pathNoImage = path.resolve(__dirname, '../assets/no-imagen.png')
        res.sendFile(pathNoImage)
    }
})

module.exports = app 