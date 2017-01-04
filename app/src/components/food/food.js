import template from './food.html';

export default {
    template,
    controller
};


controller.$inject = ['foodService'];

function controller(food) {
    this.styles = styles;

    food.getAll().then(food => {
        this.food = food;
    });

    this.add = food => {
        food.add(food)
            .then(saved => {
                this.food.push(saved);
            });

    };

    this.new = () => {
        this.viewNew = true;
        this.viewSearch = false;
    };

    this.search = () => {
        this.viewSearch = true;
        this.viewNew = false;
    };


// controller.$inject=['$state'];

// function controller($state) {

// }