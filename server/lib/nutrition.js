const rp = require('request-promise');

const NUTRI_API = process.env.NUTRI_API;
const APP_KEYS = `&appId=${process.env.APPID}&appKey=${process.env.APP_SECRET}`;
const RESULTS = 'results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id_%2Cnf_calories%2Cnf_total_fat%2Cnf_calories_from_fat%2Cnf_saturated_fat%2Cnf_monounsaturated_fat%2Cnf_polyunsaturated_fat%2Cnf_cholesterol%2Cnf_total_carbohydrate%2Cnf_dietary_fiber%2Cnf_sugars%2Cnf_protein%2Cnf_vitamin_a_dv%2Cnf_vitamin_c_dv%2Cnf_calcium_dv%2Cnf_iron_dv%2Cnf_potassium%2Cnf_servings_per_container%2Cnf_serving_weight_grams';

function getInfo(url) {
    return rp(url + APP_KEYS)
        .then(nutrifood => {
            let jsonData = (JSON.parse(nutrifood));
            return {
                name: jsonData.item_name,
                // add barcode from model, then you can do:
                barcode: jsonData.barcode || 888888888888,
                // if not available, you'd have to move
                // logic to byBarcode and byName
                servingSize: jsonData.nf_serving_size_qty,
                servingUnit: jsonData.nf_serving_size_unit,
                Calories: jsonData.nf_calories,
                totalCarbs: jsonData.nf_total_carbohydrate,
                sugars: jsonData.nf_sugars,
                fiber: jsonData.nf_dietary_fiber,
                totalFats: jsonData.nf_total_fat,
                saturatedFats: jsonData.nf_saturated_fat,
                totalProtein: jsonData.nf_protein,
                vetted: true,
                uploadedBy: 'NutriData API'
            };
        });
}

module.exports = {
    byBarcode(barcode) {
        return getInfo(`${NUTRI_API}item?upc=${barcode}`);
    },
    byName(name) {
        return getInfo(`${NUTRI_API}search/${name}?${RESULTS}`);
    }
}