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
        this.name = '',
        this.barcode = '',
        this.servingSize = '',
        this.calories = '',
        this.sugars = '',
        this.fiber = '',
        this.totalFats = '',
        this.saturatedFats = '',
        this.totalProtein = '',
        this.vetted = '';

    };

    this.reset();

    this.addNew = () => {
        this.add({
            name: this.name,
            barcode: this.barcode,
            servingSize: this.servingSize,
            calories: this.colories,
            totalCarbs: this.totalCarbs,
            sugars: this.sugars,
            fiber: this.fiber,
            totalFats: this.totalFats,
            saturatedFats: this.saturatedFats,
            unsaturatedFats: this.unsaturatedFats,
            totalProtein: this.totalProtein,
            vetted: this.vetted            
        });
        this.reset();
    };

    // foodService.get().then(food => {
    //     this.food = food;
    // });
}