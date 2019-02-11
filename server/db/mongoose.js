const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('Mongo Connected'))
    .catch(err => console.log('Mongo Error: ', err));
