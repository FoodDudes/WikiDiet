// Testing the data model
const Food = require('../../lib/models/food');
const assert = require('chai').assert;

describe('Validate Food model', () => {
  
    it('Validation with all properties', done => {
        const newFood = new Food({
            name: 'TestFood',
            barcode: 1234567890,
            servingSize: 2,
            servingUnit: 'barrels',
            calories: 20,
            totalCarbs: 25,
            sugars: 5,
            fiber: 15,
            totalFats: 10,
            saturatedFats: 5,
            unsaturatedFats: 5,
            totalProtein: 15,
            vetted: true,
            uploadedBy: 'testFoodie'
        });

        newFood.validate(err => {
            if (!err) done();
            else done(err);
        });
    });

    it('Validation with all required properties', done => {
        const newFood = new Food({
            name: 'TestFood'
        });

        newFood.validate(err => {
            if (!err) done();
            else done(err);
        });
    });

    it('Validation with missing name', done => {
        const newFood = new Food({
            barcode: 1234567890,
            servingSize: 2,
            servingUnit: 'barrels',
            calories: 20,
            totalCarbs: 25,
            sugars: 5,
            fiber: 15,
            totalFats: 10,
            saturatedFats: 5,
            unsaturatedFats: 5,
            totalProtein: 15,
            vetted: true,
            uploadedBy: 'testFoodie'
        });

        newFood.validate(err => {
            assert.isOk(err, 'name should be required');
            done();
        });
    });

});
