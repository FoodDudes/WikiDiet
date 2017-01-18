
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const Food = require('../models/food');

const nutrition = require('../nutrition');

// All of the calls to the NUTRI api should be in other module that this module calls.
// That also prevents the duplication across if/else

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

    .get('/:id/names/:name', (req, res, next) => {

        const barcode = req.params.id;
        const name = req.params.name;
        let foodPromise = null;

        if (barcode > 0) {
            foodPromise = Food.findOne({barcode}).lean()
                .then(food => {
                    if (food) return food;
                    return nutrition.byBarcode(barcode)
                        .then(data => {
                            return new Food(data).save();
                        });
                });
        } else {
            foodPromise = Food.findOne({name}).lean()
                .then(food => {
                    if (food) return food;
                    return nutrition.byName(name)
                        .then(data => {
                            return new Food(data).save();
                        });
                });
        }

        foodPromise
            .then(food => res.send(food))
            .catch(next);
    })

    .post('/', jsonParser, (req, res, next) => {
        new Food(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;
