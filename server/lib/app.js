
const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./error-handler');

const auths = require('./routes/auths');
const users = require('./routes/users');
const foods = require('./routes/foods');
const userFoods = require('./routes/userFoods');

app.use(morgan('dev'));

// now that you know what's going on with CORS, 
// consider using `npm i cors` middleware...
// if you do want/need to roll your own, this middelware should
// be in own module like error-handler is.
app.use((req, res, next) => {
    // set cors headers
    const url = '*';
    res.header('Access-Control-Allow-Origin', url);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static('./public'));

app.use('/api/auths', auths);
// no auth, all the routes are unprotected!
app.use('/api/users', users);
app.use('/api/foods', foods);
app.use('/api/userFoods', userFoods);

app.use(errorHandler);

module.exports = app;

