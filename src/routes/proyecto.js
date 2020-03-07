const { Router } = require('express');
const router = Router();

const Proyecto = require('../models/Proyecto');


router.get('/', (req, res) => {
    res.send('proyecto')
});


router.post('/', (req, res) => {
    let definicion = _.pick(req.body,['proyecto', 'definicion',])
    let proyecto = new Proyecto(definicion)
    proyecto.save()
    .then( (data) => {
        res.send(data)
    })
    .catch( (err) => {
        res.send(err)
    })
})





module.exports = router;
