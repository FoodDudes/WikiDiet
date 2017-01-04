import template from './new-food.html';
import styles from './new-food.scss';

export default {
    template,
    bindings: {
        add: '<'
    },
    controller
};

// controller.$inject = ['foodService'];

function controller() {
    this.styles = styles;
    
    this.reset = () => {
        this.name = '';
        this.type = '';

    };

    this.reset();

    this.addNew = () => {
        this.add({
            name: this.name,
            type: this.type
        });
        this.reset();
    };

    // foodService.get().then(food => {
    //     this.food = food;
    // });
}