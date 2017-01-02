
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const Food = require('../models/food');

router
    .get('/', (req, res, next) => {
        Food.find({})
        .then(foods => res.send(foods))
        .catch(next);
    })

    .post('/', jsonParser, (req, res, next) => {
        new Food(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;
