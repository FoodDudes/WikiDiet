
const rp = require('request-promise');




// call using barcode
    rp(`${process.env.NUTRI_API}item?upc=${req.params.id}&appId=${process.env.APPID}&appKey=${process.env.APP_SECRET}`)
    .then(
        
    )

// call using string name
const rsltParm = ['results=0%3A20&cal_min=0&cal_max=50000&'];

const resultParams = 'results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id_%2Cnf_calories%2Cnf_total_fat%2Cnf_calories_from_fat%2Cnf_saturated_fat%2Cnf_monounsaturated_fat%2Cnf_polyunsaturated_fat%2Cnf_cholesterol%2Cnf_total_carbohydrate%2Cnf_dietary_fiber%2Cnf_sugars%2Cnf_protein%2Cnf_vitamin_a_dv%2Cnf_vitamin_c_dv%2Cnf_calcium_dv%2Cnf_iron_dv%2Cnf_potassium%2Cnf_servings_per_container%2Cnf_serving_weight_grams'

rp(`${process.env.NUTRI_API}search/${params.req.id}?${resultParams}}&appId=${process.env.APPID}&appKet=${process.env.APP_SECRET}`)

