
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const User = require('../models/User');
// const token = require('../auth/token');
// const ensureAuth = require('../auth/ensureAuth')();

router
    .get('/', (req, res, next) => {
        User.find({})
        .then(users => res.send(users))
        .catch(next);
    });

module.exports = router;
