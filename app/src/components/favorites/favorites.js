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
        console.log(this.users[3]);
        //eventually we want to replace this push with a get request to get all of the eaten foods.  Then push this food into the array.  Then a put request to the userfoods database with the new array.
        this.menu.push(item);
        
    };

    userFoods.get().then(users => {
        this.users = users;
    });


}