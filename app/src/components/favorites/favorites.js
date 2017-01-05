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

    this.updateUser();


}