
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {type: String, required: true};

const userFoodSchema = new Schema({
    username: requiredString,
    dietId: {
        type: Schema.Types.ObjectId,
        ref: 'DietType'
    },

    // Define type inside the array...
    favorites: [],
    eaten: [],
    
    weight: Number,
    weightUnits: String,
    height: Number,
    heightUnits: String,
    age: Number,
    gender: String
});

module.exports = mongoose.model('UserFood', userFoodSchema);
