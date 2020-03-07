const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./db/conexion')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json());







const loginRutas =             require('./routes/login')
const registryRutas =          require('./routes/registry')

const usuarioRoutes =          require('./routes/usuario')



app.use('/login',               loginRutas)
app.use('/usuario',             usuarioRoutes)
app.use('/registry',            registryRutas)



app.listen(9080, '0.0.0.0');
