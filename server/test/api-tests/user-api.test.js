
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');
const assert = chai.assert;

chai.use(chaiHttp);

const connection = require('../../lib/mongoose-config');
const app = require('../../lib/app');

describe('Validating User routes', () => {

    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection(){
            const name = 'users';
            connection.db
                .listCollections({ name })
                .next( (err, collinfo) => {
                    if (!collinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        };
    });

    const testUser = {
        username: 'TestUserAPI',
        pasword: 'testPassword',
        email: 'testEmail@some.org',
        role: 'testRole'
    };

    const request = chai.request(app);

    // if only one test, make it the golden path that proves system is integrated and running
    it('GET all', done => {
        request
            .get('/api/users')
            .then(res => done('status should not be 200'))
            .catch(res => {
                assert.equal(res.status, 404);
                done();
            });
    });

});
