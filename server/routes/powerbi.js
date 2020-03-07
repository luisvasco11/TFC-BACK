const express = require('express')
const app = express()
const PowerBi = require('../models/powerbi')

app.get('/contrato/:id', async (req, res) => {
  const {id} = req.params


    try {
      const categoria = await PowerBi.find({"contratos.contrato":id} )
      res.send({OK:true,categoria})

    } catch (e) {
      res.send({OK:false,e})

    }

})

module.exports = app
