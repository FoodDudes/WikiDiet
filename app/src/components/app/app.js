import template from './app.html';
import './app.scss';

export default {
    template,
    controller
};

controller.$inject=['userFoodsService', '$rootScope', '$state'];

function controller(userFoods, rootScope, $state) {
    var date = new Date();
    var datetime = date.toLocaleString();
    var dateArr = datetime.split(', ');
    //current time
    this.time = dateArr[1];
    //current day
    this.day = dateArr[0];
    //get request here to pull all foods from the user with this day as the eaten property and add them to the daily menu

    userFoods.getByName((localStorage.getItem('userFoodUserName'))).then(user => {
        console.log('user is:', user);
        this.user = user[0];
        console.log('after getbyname the user is ', this.user);
        if(this.user){
            this.updateMenu();
        }
    });

    rootScope.$on('foodAdded', (event, user)=>{
        console.log('Hooray, useris ', user.user);
        this.user = user.user;
        this.updateMenu();
    });

    rootScope.$on('login', (event, user)=>{
        console.log('after Logged in, useris ', user.user);
        this.user = user.user.userfood;
        this.updateMenu();
    });

    rootScope.$on('logout', (event)=>{
        this.user = null;
        $state.go('home');
        // console.log('Logged out, useris ', user.user);
        // this.updateMenu();
    });

    this.updateMenu = ()=>{
        //get this user
        this.totalCalories=0;
        this.totalTotalCarbs=0;
        this.totalSugars=0;
        this.totalFiber=0;
        this.totalTotalFats=0;
        this.totalSaturatedFats=0;
        this.totalTotalProtein=0;
        //populate the menu here
        this.eaten = this.user.eaten;
        console.log('this.eaten is', this.eaten);
            //pull out only today's meals
        console.log('this.day = ', this.day);
        this.menu = this.eaten.filter((item)=>{
            return item.day === this.day;
        });

        this.menu.forEach((food)=>{
            this.totalCalories += parseInt(food.Calories);
            this.totalTotalCarbs += parseInt(food.totalCarbs);
            this.totalSugars += parseInt(food.sugars);
            this.totalFiber += parseInt(food.fiber);
            this.totalTotalFats += parseInt(food.totalFats);
            this.totalSaturatedFats += parseInt(food.saturatedFats);
            this.totalTotalProtein += parseInt(food.totalProtein);
        });

        console.log('menu is ', this.menu);
            
  
    };
  


}