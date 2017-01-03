
//model for the user schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {type: String, required: true};

const dietSchema = new Schema({
    name: requiredString
});

module.exports = mongoose.model('DietType', dietSchema);
