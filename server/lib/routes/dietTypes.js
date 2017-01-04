
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const DietType = require('../models/dietType');

router
    .get('/', (req, res, next) => {
        DietType.find({})
        .then(diets => res.send(diets))
        .catch(next);
    });

module.exports = router;
