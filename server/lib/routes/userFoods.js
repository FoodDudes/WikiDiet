
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const userFood = require('../models/userFood');

router
    .get('/', (req, res, next) => {
        userFood.find({})
        .then(userfoods => res.send(userfoods))
        .catch(next);
    })

    .post('/', jsonParser, (req, res, next) => {
        new userFood(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;
