import template from './favorites.html';

export default {
    template,
    controller
};

controller.$inject=['userFoodsService', '$rootScope', '$state'];

function controller(userFoods, rootScope, $state) {

    this.removeFromFavorites = (item)=>{
     
        this.newFavorites = this.user.favorites.filter((favorite)=>{
            return favorite.name !== item.name;
        });
        JSON.stringify(this.newFavorites);
        userFoods.addMeal(this.user._id, {'favorites': this.newFavorites}).then(this.updateUser());
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

    this.addThisAmount = (theUpdatedFavorite)=>{
        let myCustomServing = {};
        console.log('add this amount clicked, new servings are ', theUpdatedFavorite.servings);
        console.log('new selected favorite is ', theUpdatedFavorite);
        // Object.assign(myCustomServing, theUpdatedFavorite);
        myCustomServing.name = theUpdatedFavorite.name;
        myCustomServing.barcode = theUpdatedFavorite.barcode;
        myCustomServing.Calories = theUpdatedFavorite.newCalories;
        myCustomServing.totalCarbs = theUpdatedFavorite.newTotalCarbs;
        myCustomServing.sugars = theUpdatedFavorite.newSugars;
        myCustomServing.fiber = theUpdatedFavorite.newFiber;
        myCustomServing.totalFats = theUpdatedFavorite.newTotalFats;
        myCustomServing.saturatedFats = theUpdatedFavorite.newSaturatedFats;
        myCustomServing.unsaturatedFats = theUpdatedFavorite.newUnsaturatedFats;
        myCustomServing.totalProtein = theUpdatedFavorite.newTotalProtein;
        myCustomServing.servingSize= theUpdatedFavorite.newServingSize;
        console.log('addThisAmount new custom serving is ', myCustomServing);
        this.addToMenu(myCustomServing);
    };

    this.hideFavoriteItem = (item)=>{
        this.showFavorite = false;
    };

    this.addToMenu = (item)=>{
        var date = new Date();
        var datetime = date.toLocaleString();
        var dateArr = datetime.split(', ');
        let newItem = {};
        Object.assign(newItem, item);
        newItem.time = dateArr[1];
        newItem.day = dateArr[0];
        delete newItem.$$hashKey;
        let newEaten = [];
        this.user.eaten.push(newItem);
        for (var i = 0; i < this.user.eaten.length; i++) {
            newEaten[i] = this.user.eaten[i];
        };
        JSON.stringify(newEaten);
        userFoods.addMeal(this.user._id, {'eaten': newEaten})
            .then((user) => {
                rootScope.$emit('foodAdded', {user: user});
                // $state.go('favorites');
            });
    };

    this.updateUser = ()=>{
        userFoods.getByName((localStorage.getItem('userFoodUserName'))).then(user => {
            // console.log(' in get, username', localStorage.getItem('userFoodUserName'));
            this.user = user[0];
            // console.log('user is ', this.user);
        });
    };

    if (localStorage.getItem('user')){
        this.updateUser();
    }

}