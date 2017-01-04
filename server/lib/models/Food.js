
//model for the user schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {type: String, required: true};

const foodSchema = new Schema({
    name: requiredString,
    barcode: Number,
    servingSize: Number,
    servingUnit: String,
    Calories: Number,
    totalCarbs: Number,
    sugars: Number,
    fiber: Number,
    totalFats: Number,
    saturatedFats: Number,
    unsaturatedFats: Number,
    totalProtein: Number,
    vetted: Boolean,
    uploadedBy: String
});

module.exports = mongoose.model('Food', foodSchema);
