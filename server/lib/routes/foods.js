
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const Food = require('../models/food');

const rp = require('request-promise');

// below constant used for API calls by food name
const resultParams = 'results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id_%2Cnf_calories%2Cnf_total_fat%2Cnf_calories_from_fat%2Cnf_saturated_fat%2Cnf_monounsaturated_fat%2Cnf_polyunsaturated_fat%2Cnf_cholesterol%2Cnf_total_carbohydrate%2Cnf_dietary_fiber%2Cnf_sugars%2Cnf_protein%2Cnf_vitamin_a_dv%2Cnf_vitamin_c_dv%2Cnf_calcium_dv%2Cnf_iron_dv%2Cnf_potassium%2Cnf_servings_per_container%2Cnf_serving_weight_grams';

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

        let barcode = req.params.id;
        let name = req.params.name;

        if (barcode > 0) {
            // Check for a existing food entry using barcode
            Food.find({barcode}).lean()
            .then(food => {
                //     if (!food) next({code: 404, message: 'No food item found.'});
                if (food.length > 0) {
                    console.log('found food item');
                    // found in our local db, return it
                    res.send(food);
                } else {
                    console.log('No food item found in our db, call out', barcode);
                    // No entry attempt to locate the info on a 3rd party
                    rp(`${process.env.NUTRI_API}item?upc=${barcode}&appId=${process.env.APPID}&appKey=${process.env.APP_SECRET}`)
                        .then(nutrifood => {
                            console.log(nutrifood);
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
                            }
                            .catch(next);

                            // Create a new local DB entry for the item
                            new Food(newFoodEntry).save()
                                .then(saved => res.send(saved));
                        });
                }
            })
            .catch(next);
        } else {
            // search by name
            Food.find({name}).lean()
            .then(food => {
                if (food) {
                    // found in our local db, return it
                    res.send(food);
                } else {
                    // No entry attempt to locate the info on a 3rd party
                    rp(`${process.env.NUTRI_API}search/${name}?${resultParams}}&appId=${process.env.APPID}&appKey=${process.env.APP_SECRET}`)
                        .then(nutrifood => {
                            const newFoodEntry = {
                                name: nutrifood.item_name,
                                barcode: 888888888888,
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

                            // Create a new local DB entry for the item
                            new Food(newFoodEntry).save()
                                .then(saved => res.send(saved));
                        });
                }
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
