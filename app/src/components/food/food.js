import template from './food.html';
import styles from './food.scss';

export default {
    template,
    controller
};


controller.$inject = ['foodService', '$timeout'];

function controller(food, $timeout) {
    this.styles = styles;

    this.user = localStorage.getItem('user');

    this.units = ['g', 'oz', 'mL', 'cL', 'L', 'package'];

    this.servingUnit = 'g';

    this.notFound = false;

    this.viewSearch = false;

    this.viewNew = false;

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
        this.lowerName = this.name.toLowerCase();
        this.correctName = this.lowerName[0].toUpperCase() + this.lowerName.substring(1);
        console.log(this.correctName);

        food.add({
            name: this.correctName,
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

    this.search = () => {       
        if (this.searchBarcode){
            this.notFound = false;
            console.log('barcode search selected for this barcode ', this.searchBarcode);
            food.getOne(this.searchBarcode, 'name')
            .then((foods)=>{
                console.log('this is what came back from the search ', foods);
            })
            .catch(this.showErrorText());
        }
        else{
            this.lowerSearchName = this.searchName.toLowerCase();
            this.correctSearchName = this.lowerSearchName[0].toUpperCase() + this.lowerSearchName.substring(1);
            console.log('search clicked.  Searching for ', this.correctSearchName);
            console.log('name search selected for this name ', this.correctSearchName);
            food.getOne(0,this.correctSearchName)
              .then((foods)=>{
                  console.log('this is what came back from the search ', foods);
              })
            .catch(this.showErrorText());
        }
    };

    this.showErrorText= ()=>{
        console.log('in error text');
        this.notFound = true;
        $timeout(()=>{
            this.notFound = false;
        }, 3000);
    };


}
