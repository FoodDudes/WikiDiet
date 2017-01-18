
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const User = require('../models/user');
// const token = require('../auth/token');
// const ensureAuth = require('../auth/ensureAuth')();

router
    .get('/', (req, res, next) => {
        User.find({})
        .then(users => {
            // see comments in userFoods...
            if (!users || users.length === 0) {
                next({code: 404, message: 'No users found.'});
            }
            else {
                res.send(users);
            };
        })
        .catch(next);
    });

module.exports = router;
