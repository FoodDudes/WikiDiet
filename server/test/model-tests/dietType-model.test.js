// Testing the data model
const DietType = require('../../lib/models/dietType');
const assert = require('chai').assert;

describe('Validate Diet Type model', () => {
  
    it('Validation with all properties', done => {
        const newDietType = new DietType({
            name: 'TestDiet'
        });

        newDietType.validate(err => {
            if (!err) done();
            else done(err);
        });
    });

});
