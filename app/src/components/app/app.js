import template from './app.html';
import './app.scss';

export default {
    template,
    controller
};

controller.$inject=['userFoodsService'];

function controller(userFoods) {
    var date = new Date();
    var datetime = date.toLocaleString();
    var dateArr = datetime.split(', ');
    //current time
    this.time = dateArr[1];
    //current day
    this.day = dateArr[0];
    console.log(this.day);
    //get request here to pull all foods from the user with this day as the eaten property and add them to the daily menu

    //get this user
    userFoods.get().then(users => {
        this.users = users;
        console.log('this user from app.js:', this.users[2]);
    //populate the menu here
        this.eaten = this.users[2].eaten;
        console.log('this.eaten is', this.eaten);
        //pull out only today's meals
        console.log('this.day = ', this.day);
        this.menu = this.eaten.filter((item)=>{
            console.log('this item is ', item);
            console.log('this.day is now', this.day);
            return item.day === this.day;
        });
        console.log('menu is ', this.menu);

    });

  


}