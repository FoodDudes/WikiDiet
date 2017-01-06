import template from './food-search.html';
import styles from './food-search.scss';

export default {
    template,
    controller
};

controller.$inject = ['foodService'];

function controller(food) {
    this.styles = styles;


    this.add = food => {
        food.add(food)
            .then(saved => {
                this.food.push(saved);
            });
    };

}