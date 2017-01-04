import template from './favorites.html';

export default {
    template,
    controller
};

controller.$inject=['userFoodsService'];

function controller(userFoods) {

    this.removeFromFavorites = ()=>{
        console.log('remove from favorites clicked');
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
        userFoods.addMeal(this.user._id, {'eaten': this.newEaten}); 
    };

    userFoods.getByName((localStorage.getItem('userFoodUserName'))).then(user => {
        console.log(' in get, username', localStorage.getItem('userFoodUserName'));
        this.user = user[0];
        console.log('user is ', this.user);
    });


}