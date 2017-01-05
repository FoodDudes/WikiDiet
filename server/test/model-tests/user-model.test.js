// Testing the data model
const User = require('../../lib/models/user');
const assert = require('chai').assert;

describe('Validate User model: ', () => {
  
    it('Validation with all properties', done => {
        const newUser = new User({
            username: 'TestUser',
            password: 'testPassword',
            email: 'testEmail@some.org',
            role: 'testRole'
        });

        newUser.validate(err => {
            if (!err) done();
            else done(err);
        });
    });

    it('Validation with all required properties', done => {
        const newUser = new User({
            username: 'TestUser',
            password: 'testPassword'
        });

        newUser.validate(err => {
            if (!err) done();
            else done(err);
        });
    });

    it('Validation with missing User name', done => {
        const newUser = new User({
            password: 'testPassword',
            email: 'testEmail@some.org',
            role: 'testRole'
        });

        newUser.validate(err => {
            assert.isOk(err, 'username should be required');
            done();
        });
    });

    it('Validation with missing Password', done => {
        const newUser = new User({
            username: 'TestUser',
            email: 'testEmail@some.org',
            role: 'testRole'
        });

        newUser.validate(err => {
            assert.isOk(err, 'password should be required');
            done();
        });
    });

});