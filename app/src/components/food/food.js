import template from './food.html';
import styles from './food.scss';

export default {
    template,
    controller
};


controller.$inject = ['foodService'];

function controller(food) {
    this.styles = styles;

    this.user = localStorage.getItem('user');

    this.units = ['g', 'oz', 'mL', 'cL', 'L', 'package'];

    this.servingUnit = 'g';

    this.reset = () => {
        this.name = '',
        this.barcode = '',
        this.servingSize = '',
        this.servingUnit = 'g',
        this.Calories = '',
        this.totalCarbs = '',
        this.sugars = '',
        this.fiber = '',
        this.totalFats = '',
        this.unsaturatedFats = '',
        this.saturatedFats = '',
        this.totalProtein = '';
    };

    this.reset();

    this.addNew = () => {
        
        food.add({
            name: this.name,
            barcode: this.barcode,
            servingSize: this.servingSize,
            servingUnits: this.servingUnits,
            Calories: this.Calories,
            totalCarbs: this.totalCarbs,
            sugars: this.sugars,
            fiber: this.fiber,
            totalFats: this.totalFats,
            saturatedFats: this.saturatedFats,
            unsaturatedFats: this.unsaturatedFats,
            totalProtein: this.totalProtein,
            vetted: false           
        }).then((food)=>
            console.log('food is ', food));
        this.reset();
    };


    this.toggleSearch = ()=>{
        console.log('toggle called', this.viewSearch);
        if (this.viewSearch === true){
            this.viewSearch = false;
        }
        else{
            this.viewSearch = true;
        }
    };

    this.toggleNew = ()=>{
        console.log('toggle called', this.viewNew);
        if (this.viewNew === true){
            this.viewNew = false;
        }
        else{
            this.viewNew = true;
        }
    };

    this.viewSearch = true;
    this.viewNew = false;


    // this.add = food => {
    //     food.add(food)
    //         .then(saved => {
    //             this.food.push(saved);
    //         });
    // };

    // this.new = () => {
    //     this.viewNew = true;
    //     this.viewSearch = false;
    // };

    this.search = () => {
        this.viewSearch = true;
        this.viewNew = false;
    };
}
