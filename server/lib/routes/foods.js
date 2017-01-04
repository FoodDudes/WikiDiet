
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

    // .get('/:id/name/:name', (req, res, next) => {
    //     let passedParam = req.params.id;
    //     let barcode = 0;
    //     let name = '';
    //     console.log('Get by Param: supplied data', passedParam);
    //     console.log('type of passed Param:', typeof(passedParam));
    //     if (typeof(passedParam) === 'number') {
    //         console.log('finding by barcode');
    //         barcode = passedParam;

    .get('/:id', (req, res, next) => {

        let barcode = req.params.id;
            // Check for a existing food entry
            Food.find(barcode).lean()
            .then(food => {
        //         if (!food) next({code: 404, message: 'No food item found.'});
        //         else res.send(food);            
        //     })
        //     .catch(next);
        // // } else {
        //     console.log('finding by food name');
        //     name = passedParam;
        //     Food.find(name).lean()
        //     .then(food => {
        //         if (!food) next({code: 404, message: 'No food item found.'});
        //         else res.send(food);

                // If entry, return
                if (food) {
                    // do nothing
                    console.log('found: ', food);
                    res.send(food);
                // If no entry attempt to locate the info on a 3rd party
                } else {
                    rp(`${process.env.NUTRI_API}item?upc=${req.params.id}&appId=${process.env.APPID}&appKet=${process.env.APP_SECRET}`)
                        .then(nutrifood => {
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

                            // Create a new DB entry for the item
                            new Food(newFoodEntry).save()
                                .then(saved => res.send(saved));
                        });
                }
            })
        .catch(next);
    })
    //     } else {
    //         name = passedParam;
    //         Food.find(name).lean()
    //         .then(food => {
    //             if (!food) {
    //                 // no item in our database, call API
    //                 NutriData.getIt()
    //                 .then(nutrifood => {
    //                     if (!nutrifood) next({code: 404, message: 'No food item found.'});
    //                     const newFoodEntry = {
    //                         name: nutrifood.item_name,
    //                         barcode: 999999999999,
    //                         servingSize: nutrifood.nf_serving_size_qty,
    //                         servingUnit: nutrifood.nf_serving_size_unit,
    //                         calories: nutrifood.nf_calories,
    //                         totalCarbs: nutrifood.nf_total_carbohydrate,
    //                         sugars: nutrifood.nf_sugars,
    //                         fiber: nutrifood.nf_dietary_fiber,
    //                         totalFats: nutrifood.nf_total_fat,
    //                         saturatedFats: nutrifood.nf_saturated_fat,
    //                         unsaturatedFats: (nutrifood.nf_polyunsaturated_fat + nutrifood.nf_monounsaturated_fat),
    //                         totalProtein: nutrifood.nf_protein,
    //                         vetted: true,
    //                         uploadedBy: 'NutriData API'
    //                     };
    //                     new Food(newFoodEntry).save()
    //                         .then(saved => res.send(saved));
    //                 });
    //             }
    //             res.send(food);
    //         })
    //         .catch(next);
    //     };
    // })

    .post('/', jsonParser, (req, res, next) => {
        new Food(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;
