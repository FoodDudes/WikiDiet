import template from './food-search.html';
import styles from './food-search.scss';

export default {
    template,
    controller
};

controller.$inject = ['foodService'];

function controller(food) {
    this.styles = styles;

    albums.getAll().then(food => {
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
        this.viewDetail = false;
    };

    this.detail = () => {
        this.viewDetail = true;
        this.viewNew = false;
    };

}