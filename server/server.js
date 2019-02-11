require('./config/config');
require('./db/mongoose');

//THIRD PARTY MODULES
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
//CUSTOM FILES
const posts = require('./route/posts');
const users = require('./route/users');
const comments = require('./route/comments');

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    exposedHeaders: ['Content-Length', 'Authorization']
}));

app.use('/posts', posts);
app.use('/users', users);
app.use('/comments', comments);

//MERN APP SETUP FOR PRODUCTION 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    });
}
//SERVER
app.listen(process.env.PORT, () => {
    console.log(`Server Up At ${process.env.PORT}`);
});