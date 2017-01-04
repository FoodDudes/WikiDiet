
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const Food = require('../models/food');

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

    .get('/:id/name/:name', (req, res, next) => {
        let passedParam = req.params.id;
        let barcode = 0;
        let name = '';
        console.log('Get by Param: supplied data', passedParam);
        console.log('type of passed Param:', typeof(passedParam));
        if (typeof(passedParam) === 'number') {
            console.log('finding by barcode');
            barcode = passedParam;

            Food.find(barcode).lean()
            .then(food => {
                if (!food) next({code: 404, message: 'No food item found.'});
                else res.send(food);            
            })
            .catch(next);
        } else {
            console.log('finding by food name');
            name = passedParam;
            Food.find(name).lean()
            .then(food => {
                if (!food) next({code: 404, message: 'No food item found.'});
                else res.send(food);
            })
            .catch(next);
        };
    })

    .post('/', jsonParser, (req, res, next) => {
        new Food(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;
