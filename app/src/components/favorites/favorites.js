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

    this.addToMenu = ()=>{
        console.log('add to menu clicked');
    };

    userFoods.get().then(users => {
        this.users = users;
    });


}