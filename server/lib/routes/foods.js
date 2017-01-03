
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const Food = require('../models/Food');

router
    .get('/', (req, res, next) => {
        Food.find({})
        .then(foods => {
            if (!foods || foods.length === 0) {
                next({code: 404, message: 'No foods found.'});
            }
            else {
                res.send(foods);
            };
        })
        .catch(next);
    })

    .get('/:id', (req, res, next) => {
        let foodId = req.params.id;

        Food.findById(foodId).lean()
        .then(food => {
            if (!food) {
                next({code: 404, message: 'No food found.'});
            }
            res.send(food);            
        })
        .catch(next);
    })

    .post('/', jsonParser, (req, res, next) => {
        new Food(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;
