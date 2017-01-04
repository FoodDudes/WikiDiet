
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');
const assert = chai.assert;

chai.use(chaiHttp);

const connection = require('../../lib/mongoose-config');
const app = require('../../lib/app');

describe('Validating Foods routes', () => {

    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection(){
            const name = 'foods';
            connection.db
                .listCollections({ name })
                .next( (err, collinfo) => {
                    if (!collinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        };
    });

    const testFood = {
        name: 'TestFood',
        barcode: 1098765432,
        servingSize: 2,
        servingUnit: 'tbsp',
        Calories: 184,
        totalCarbs: 180,
        sugars: 175,
        fiber: 4,
        totalFats: 2,
        saturatedFats: 1,
        unsaturatedFats: 0,
        totalProtein: 1,
        vetted: true,
        uploadedBy: 'TestMan'
    };

    const request = chai.request(app);

    it('GET all before posting', done => {
        request
            .get('/api/foods')
            .then(res => done('status should not be 200'))
            .catch(res => {
                assert.equal(res.status, 404);
                done();
            });
    });

    it('POST new food', done => {
        request
            .post('/api/foods')
            .send(testFood)
            .then(res => {
                const food = res.body;
                assert.ok(food._id);
                testFood._id = food._id;
                testFood.__v = 0;
                done();
            })
            .catch(done);
    });

    it ('GET all after POST', done => {
        request
            .get('/api/foods')
            .then(res => {
                assert.deepEqual(res.body, [testFood]);
                done();
            })
            .catch(done);
    });

    it('GET by barcode', done => {
        request
            .get(`/api/foods/${testFood.barcode}`)
            .then(res => {
                assert.deepEqual(res.body, [testFood]);
                done();
            })
            .catch(done);
    });

    it('GET by name', done => {
        request
            .get(`/api/foods/${testFood.name}`)
            .then(res => {
                assert.deepEqual(res.body, [testFood]);
                done();
            })
            .catch(done);
    });

    // it('DELETE a food', done => {
    //     request
    //         .delete(`/api/foods/${testFood._id}`)
    //         .then(res => {
    //             const deletedFood = res.body;
    //             assert.ok(deletedFood._id);
    //             done();
    //         })
    //         .catch(done);
    // });

});
