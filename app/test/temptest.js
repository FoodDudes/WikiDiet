
describe( 'Food Service', () => {
    const { assert } = chai;

    // mock the services module
    beforeEach( 
        angular.mock.module('services', { apiUrl: '/api' })
    );
    
    let $httpBackend = null, foodService = null;
    
    beforeEach(angular.mock.inject((_foodService_, _$httpBackend_ ) => {
        $httpBackend = _$httpBackend_;
        foodService = _foodService_;
    }));

    afterEach(() => {
        // make sure the $httpBackend expectations that we set up
        // have actually happened
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it( 'get foods', done => {
        // mock return data from food get
        const foods = [1, 2, 3];
        
        // set the expectation
        $httpBackend
            // what http VERB and url are we expecting?
            .expectGET('/api/foods')
            // mock a reponse that will get set on the .data 
            // property of $http response object
            .respond(foods);

        // make the call against SUT
        foodService.get()
            .then(allFoods => {
                // $httpBackend serializes the object we pass to
                // .respond, so to "test" we need to do 
                // deepEqual as they are no longer the same object reference
                assert.deepEqual(allFoods, foods);
                done();
            })
            .catch(done);

        // we need to tell $httpBackend everything is setup and okay
        // to "flush" (send) reponses back
        $httpBackend.flush();
    });


    it('add food', done => {

        const food = {
            name: 'testFood',
            barcode: 1234567890,
            servingSize: 1,
            servingUnit: 'cup',
            Calories: 232,
            totalCarbs: 32,
            sugars: 12,
            fiber: 11,
            totalFats: 100,
            saturatedFats: 30,
            unsaturatedFats: 25,
            totalProtein: 125,
            vetted: true,
            uploadedBy: 'Mugsy'
        };
        
        $httpBackend
            .expectPOST('/api/foods', food)
            .respond(food);

        foodService.add(food)
            .then(saved => {
                assert.deepEqual(saved, food);
                done();
            })
            .catch(done);

        $httpBackend.flush();
    });

    // it('remove food', done => {
    //     const food = {
    //         title: 'testFood',
    //         description: 'a test food',
    //         url: 'fake URL',
    //         _id: 'ABC123'
    //     };
        
    //     $httpBackend
    //         .expectDELETE(`/api/foods/${food._id}`)
    //         .respond(food);

    //     foodService.remove(food)
    //         .then(removed => {
    //             assert.deepEqual(removed, food);
    //             done();
    //         })
    //         .catch(done);

    //     $httpBackend.flush();
    // });
    
});