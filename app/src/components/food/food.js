import template from './food.html';
import styles from './food.scss';

export default {
    template,
    controller
};


controller.$inject = ['foodService', 'userFoodsService', '$timeout', '$rootScope'];

function controller(food, userFoods, $timeout, rootScope) {
    this.styles = styles;

    this.user = localStorage.getItem('user');

    this.units = ['g', 'oz', 'mL', 'cL', 'L', 'package'];

    this.servingUnit = 'g';

    this.notFound = false;

    this.viewSearch = false;

    this.viewNew = false;

    this.favoriteAdded = false;

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
            servingUnit: this.servingUnit,
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
            this.results = [];
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
                this.results = foods;
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
                  this.results = foods;
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

    this.viewResultItem=(item)=>{
        this.showResult = true;
        this.selectedResult = item;
        console.log(this.selectedResult);
        this.selectedResult.newServingSize=this.selectedResult.servingSize;
        this.selectedResult.servings = (this.selectedResult.newServingSize/this.selectedResult.servingSize).toFixed(2);
    };

    this.hideResultItem=(item)=>{
        this.showResult = false;
        this.selectedResult = {};
    };

    this.updateServingSize = ()=>{
        this.selectedResult.servings = (this.selectedResult.newServingSize/this.selectedResult.servingSize).toFixed(2);
        this.newCalories = this.selectedResult.Calories*this.selectedResult.servings;
        //repeat this for all other factors and show on the display;
        this.selectedResult.newCalories = (this.selectedResult.Calories*this.selectedResult.servings).toFixed(0);
        this.selectedResult.newTotalCarbs =
        (this.selectedResult.totalCarbs*this.selectedResult.servings).toFixed(1);
        this.selectedResult.newSugars = 
        (this.selectedResult.sugars*this.selectedResult.servings).toFixed(1);
        this.selectedResult.newFiber = (this.selectedResult.fiber*this.selectedResult.servings).toFixed(1);
        this.selectedResult.newTotalFats =
        (this.selectedResult.totalFats*this.selectedResult.servings).toFixed(1);
        this.selectedResult.newUnsaturatedFats = (this.selectedResult.unsaturatedFats*this.selectedResult.servings).toFixed(1);
        this.selectedResult.newSaturatedFats = (this.selectedResult.saturatedFats*this.selectedResult.servings).toFixed(1);
        this.selectedResult.newTotalProtein = (this.selectedResult.totalProtein*this.selectedResult.servings).toFixed(1);
    };

    this.addThisAmount = ()=>{
        console.log('add this amount clicked, new servings are ', this.selectedResult.servings);
        console.log('new selected Result is ', this.selectedResult);
        this.customServing = this.selectedResult;
        this.customServing.Calories = this.selectedResult.newCalories;
        this.customServing.totalCarbs = this.selectedResult.newTotalCarbs;
        this.customServing.sugars = this.selectedResult.newSugars;
        this.customServing.fiber = this.selectedResult.newFiber;
        this.customServing.totalFats = this.selectedResult.newTotalFats;
        this.customServing.saturatedFats = this.selectedResult.newSaturatedFats;
        this.customServing.unsaturatedFats = this.selectedResult.newUnsaturatedFats;
        this.customServing.totalProtein = this.selectedResult.newTotalProtein;
        this.customServing.servingSize= this.selectedResult.newServingSize;
        console.log('new custom serving is ', this.customServing);
        this.addToMenu(this.customServing);
    };

    this.addToFavorites = (item)=>{
        console.log('add to favorites clicked');
        console.log('this.user favorites', this.user.favorites);
        console.log('item is ', item);
        this.newFavorites = this.user.favorites;
        this.newFavorites.push(item);
        console.log(this.newFavorites);
        JSON.stringify(this.newFavorites);
        console.log('addind this json array ' + this.newFavorites + ' to this user '+ this.user._id);
        userFoods.addMeal(this.user._id, {'favorites': this.newFavorites}).then(this.updateUser());
        this.addedName = item.name;
        this.favoriteAdded= true;
        $timeout(()=>{
            this.favoriteAdded = false;
        }, 2000);
    };
    



    this.addToMenu = (item)=>{
        var date = new Date();
        var datetime = date.toLocaleString();
        var dateArr = datetime.split(', ');
        item.time = dateArr[1];
        item.day = dateArr[0];
        delete item.$$hashKey;
        console.log('item is ', item);
        this.newEaten = this.user.eaten;
        this.newEaten.push(item);
        console.log('newEaten is', this.newEaten);
        JSON.stringify(this.newEaten);
        console.log('addind this json array ' + this.newEaten+ ' to this user '+ this.user._id);
        userFoods.addMeal(this.user._id, {'eaten': this.newEaten}).then((user)=>(rootScope.$emit('foodAdded', {user: user})));
    };

    this.updateUser = ()=>{
        userFoods.getByName((localStorage.getItem('userFoodUserName'))).then(user => {
            console.log(' in get, username', localStorage.getItem('userFoodUserName'));
            this.user = user[0];
            console.log('user is ', this.user);
        });
    };

    if (localStorage.getItem('user')){
        this.updateUser();
    }



}
