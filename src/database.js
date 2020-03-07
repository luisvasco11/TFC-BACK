const mongoose = require('mongoose');
  
mongoose.connect('mongodb+srv://luis:Celeste.3611319@cluster0-ihvzc.azure.mongodb.net/tfc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));
