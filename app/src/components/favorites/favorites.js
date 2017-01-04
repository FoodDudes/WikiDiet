import template from './favorites.html';

export default {
    template,
    controller
};

controller.$inject=['userFoodsService'];

function controller(userFoods) {
    this.menu =[];

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
        this.newEaten = this.users[2].eaten;
        this.newEaten.push(item);
        console.log('newEaten is', this.newEaten);
        JSON.stringify(this.newEaten);
        console.log('addind this json array ' + this.newEaten+ ' to this user '+ this.users[2]._id);
        userFoods.addMeal(this.users[2]._id, {'eaten': this.newEaten}); 
    };

    userFoods.get().then(users => {
        this.users = users;
        console.log(users[2]);
    });


}