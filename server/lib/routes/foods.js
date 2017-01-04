
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const Food = require('../models/food');
const NutriData = require('./api/nutriData');

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
        let passedParam = req.params.id;
        let barcode = 0;
        let name = '';

        if (typeof(passedParam) === 'number') {
            barcode = passedParam;

            Food.find(barcode).lean()
            .then(food => {
                if (!food) {
                    // no item in our database, call API
                    NutriData.getIt()
                    .then(nutrifood => {
                        if (!nutrifood) next({code: 404, message: 'No food item found.'});
                        const newFoodEntry = {
                            name: nutrifood.item_name,
                            barcode,
                            servingSize: nutrifood.nf_serving_size_qty,
                            servingUnit: nutrifood.nf_serving_size_unit,
                            calories: nutrifood.nf_calories,
                            totalCarbs: nutrifood.nf_total_carbohydrate,
                            sugars: nutrifood.nf_sugars,
                            fiber: nutrifood.nf_dietary_fiber,
                            totalFats: nutrifood.nf_total_fat,
                            saturatedFats: nutrifood.nf_saturated_fat,
                            unsaturatedFats: (nutrifood.nf_polyunsaturated_fat + nutrifood.nf_monounsaturated_fat),
                            totalProtein: nutrifood.nf_protein,
                            vetted: true,
                            uploadedBy: 'NutriData API'
                        };
                        new Food(newFoodEntry).save()
                            .then(saved => res.send(saved));
                    });
                };
                res.send(food);            
            })
            .catch(next);
        } else {
            name = passedParam;
            Food.find(name).lean()
            .then(food => {
                if (!food) {
                    // no item in our database, call API
                    NutriData.getIt()
                    .then(nutrifood => {
                        if (!nutrifood) next({code: 404, message: 'No food item found.'});
                        const newFoodEntry = {
                            name: nutrifood.item_name,
                            barcode: 999999999999,
                            servingSize: nutrifood.nf_serving_size_qty,
                            servingUnit: nutrifood.nf_serving_size_unit,
                            calories: nutrifood.nf_calories,
                            totalCarbs: nutrifood.nf_total_carbohydrate,
                            sugars: nutrifood.nf_sugars,
                            fiber: nutrifood.nf_dietary_fiber,
                            totalFats: nutrifood.nf_total_fat,
                            saturatedFats: nutrifood.nf_saturated_fat,
                            unsaturatedFats: (nutrifood.nf_polyunsaturated_fat + nutrifood.nf_monounsaturated_fat),
                            totalProtein: nutrifood.nf_protein,
                            vetted: true,
                            uploadedBy: 'NutriData API'
                        };
                        new Food(newFoodEntry).save()
                            .then(saved => res.send(saved));
                    });
                }
                res.send(food);
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
