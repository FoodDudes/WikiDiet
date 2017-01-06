
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {type: String, required: true};

const foodSchema = new Schema({
    name: requiredString,
    barcode: {type: Number, default: 0}, 
    servingSize: {type: Number, default: 0}, 
    servingUnit: {type: String, default: 'g'}, 
    Calories: {type: Number, default: 0}, 
    totalCarbs: {type: Number, default: 0}, 
    sugars: {type: Number, default: 0}, 
    fiber: {type: Number, default: 0}, 
    totalFats: {type: Number, default: 0}, 
    saturatedFats: {type: Number, default: 0}, 
    unsaturatedFats: {type: Number, default: 0}, 
    totalProtein: {type: Number, default: 0}, 
    vetted: Boolean,
    uploadedBy: {type: String, default: 'user'}, 
});

module.exports = mongoose.model('Food', foodSchema);

