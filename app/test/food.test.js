describe('Food component', () => {
    const { assert } = chai;

    angular.mock.module.sharedInjector();  

    before(angular.mock.module('components'));

    let $component = null;

    before(angular.mock.inject($componentController => {
        $component = $componentController;
    }));

    const foodService = {
        get() {
            return Promise.resolve(food);
        },
        add(food) {
            return Promise.resovle(food)
        }
    }




});