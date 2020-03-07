const express = require('express')
const app = express()

let token 
app.post('/',(req, res) => {
  console.log(req.body);
  token=req.body.token
  res.end();
});


app.get('/', (req, res) => {
  console.log("Ingreso",res,req)
  res.status(200).json({token})
})

module.exports = app