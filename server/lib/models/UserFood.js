
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {type: String, required: true};

//userFood
const userFoodSchema = new Schema({
    username: requiredString,
    dietId: {
        type: Schema.Types.ObjectId,
        ref: 'DietType'
    },
    favorites: [],
    eaten: [],
    weight: Number,
    height: Number,
    age: Number,
    gender: String
});

module.exports = mongoose.model('UserFood', userFoodSchema);
