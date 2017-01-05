import template from './favorites.html';

export default {
    template,
    controller
};

controller.$inject=['userFoodsService', '$rootScope'];

function controller(userFoods, rootScope) {

    this.removeFromFavorites = (item)=>{
        console.log('remove from favorites clicked');
        console.log('this.user favorites', this.user.favorites);
        console.log('item is ', item);
        this.newFavorites = this.user.favorites.filter((favorite)=>{
            return favorite.name !== item.name;
        });
        console.log(this.newFavorites);
        JSON.stringify(this.newFavorites);
        console.log('addind this json array ' + this.newFavorites + ' to this user '+ this.user._id);
        userFoods.addMeal(this.user._id, {'favorites': this.newFavorites}).then(this.updateUser());
    };

    this.updateServingSize = (value) =>{
        console.log(value);
    };

    this.viewFavoriteItem = (item)=>{
        this.showFavorite = true;
        this.selectedFavorite = item;
        console.log(this.selectedFavorite);
        this.selectedFavorite.newServingSize=this.selectedFavorite.servingSize;
        this.selectedFavorite.servings = (this.selectedFavorite.newServingSize/this.selectedFavorite.servingSize).toFixed(2);
    };

    this.updateServingSize = ()=>{
        this.selectedFavorite.servings = (this.selectedFavorite.newServingSize/this.selectedFavorite.servingSize).toFixed(2);
        this.newCalories = this.selectedFavorite.Calories*this.selectedFavorite.servings;
        //repeat this for all other factors and show on the display;
        this.selectedFavorite.newCalories = (this.selectedFavorite.Calories*this.selectedFavorite.servings).toFixed(0);
        this.selectedFavorite.newTotalCarbs =
        (this.selectedFavorite.totalCarbs*this.selectedFavorite.servings).toFixed(1);
        this.selectedFavorite.newSugars = 
        (this.selectedFavorite.sugars*this.selectedFavorite.servings).toFixed(1);
        this.selectedFavorite.newFiber = (this.selectedFavorite.fiber*this.selectedFavorite.servings).toFixed(1);
        this.selectedFavorite.newTotalFats =
        (this.selectedFavorite.totalFats*this.selectedFavorite.servings).toFixed(1);
        this.selectedFavorite.newUnsaturatedFats = (this.selectedFavorite.unsaturatedFats*this.selectedFavorite.servings).toFixed(1);
        this.selectedFavorite.newSaturatedFats = (this.selectedFavorite.saturatedFats*this.selectedFavorite.servings).toFixed(1);
        this.selectedFavorite.newTotalProtein = (this.selectedFavorite.totalProtein*this.selectedFavorite.servings).toFixed(1);
    };

    this.addThisAmount = ()=>{
        console.log('add this amount clicked, new servings are ', this.selectedFavorite.servings);
        console.log('new selected favorite is ', this.selectedFavorite);
        this.customServing = this.selectedFavorite;
        this.customServing.Calories = this.selectedFavorite.newCalories;
        this.customServing.totalCarbs = this.selectedFavorite.newTotalCarbs;
        this.customServing.sugars = this.selectedFavorite.newSugars;
        this.customServing.fiber = this.selectedFavorite.newFiber;
        this.customServing.totalFats = this.selectedFavorite.newTotalFats;
        this.customServing.saturatedFats = this.selectedFavorite.newSaturatedFats;
        this.customServing.unsaturatedFats = this.selectedFavorite.newUnsaturatedFats;
        this.customServing.totalProtein = this.selectedFavorite.newTotalProtein;
        this.customServing.servingSize= this.selectedFavorite.newServingSize;
        console.log('new custom serving is ', this.customServing);
        this.addToMenu(this.customServing);
    };

    this.hideFavoriteItem = (item)=>{
        this.showFavorite = false;
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