
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');
const assert = chai.assert;

chai.use(chaiHttp);

const connection = require('../../lib/mongoose-config');
const app = require('../../lib/app');

describe('Validating UserFoods routes', () => {

    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection(){
            const name = 'userfoods';
            connection.db
                .listCollections({ name })
                .next( (err, collinfo) => {
                    if (!collinfo) return done();
                    console.log('dropping collection:', name);
                    connection.db.dropCollection(name, done);
                });
        };
    });

    const testUserFood = {
        username: 'testUserName',
        dietId: '581d1eee6823e51ab3d78fbe',
        favorites: [],
        eaten: [],
        weight: 220,
        height: 77,
        age: 33,
        gender: 'other'
    };

    const request = chai.request(app);

    it('GET all before posting', done => {
        request
            .get('/api/userfoods')
            .then(res => done('status should not be 200'))
            .catch(res => {
                assert.equal(res.status, 404);
                done();
            });
    });

    it('POST new userfood', done => {
        request
            .post('/api/userfoods')
            .send(testUserFood)
            .then(res => {
                const userFood = res.body;
                assert.ok(userFood._id);
                testUserFood._id = userFood._id;
                testUserFood.__v = 0;
                done();
            })
            .catch(done);
    });

    it ('GET all after POST', done => {
        request
            .get('/api/userfoods')
            .then(res => {
                assert.deepEqual(res.body, [testUserFood]);
                done();
            })
            .catch(done);
    });

    it('GET by userName', done => {
        request
            .get(`/api/userfoods/${testUserFood.username}`)
            .then(res => {
                // console.log(res.body);
                assert.deepEqual(res.body, [testUserFood]);
                done();
            })
            .catch(done);
    });

});
