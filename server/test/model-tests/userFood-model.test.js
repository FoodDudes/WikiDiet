// Testing the data model
const UserFood = require('../../lib/models/userFood');
const assert = require('chai').assert;

describe('Validate Food model', () => {
  
    it('Validation with all properties', done => {
        const newUserFood = new UserFood({
            username: 'testUserName',
            dietId: '581d1eee6823e51ab3d78fbe',
            favorites: [],
            eaten: [],
            weight: 220,
            height: 77,
            age: 33,
            gender: 'other'
        });

        newUserFood.validate(err => {
            if (!err) done();
            else done(err);
        });
    });

    it('Validation with all required properties', done => {
        const newUserFood = new UserFood({
            username: 'TestUserName'
        });

        newUserFood.validate(err => {
            if (!err) done();
            else done(err);
        });
    });

    it('Validation with missing name', done => {
        const newUserFood = new UserFood({
            dietId: '581d1eee6823e51ab3d78fbe',
            favorites: [],
            eaten: [],
            weight: 220,
            height: 77,
            age: 33,
            gender: 'other'
        });

        newUserFood.validate(err => {
            assert.isOk(err, 'username should be required');
            done();
        });
    });

});
