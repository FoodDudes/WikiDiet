import template from './favorites.html';

export default {
    template,
    controller
};

controller.$inject=['userFoodsService'];

function controller(userFoods) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.currentUserFood = JSON.parse(localStorage.getItem('userFood'));

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
        this.newEaten = this.currentUserFood[0].eaten;
        this.newEaten.push(item);
        console.log('newEaten is', this.newEaten);
        JSON.stringify(this.newEaten);
        userFoods.addMeal(this.currentUserFood[0]._id, {'eaten': this.newEaten}); 
    };

}