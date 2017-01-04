import template from './me.html';

export default {
    template,
    controller
};

function controller() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.currentUserFood = JSON.parse(localStorage.getItem('userFood'))[0];

    console.log(this.currentUser);
    console.log(this.currentUserFood);

  //AJ's formula will go here to calculate a person's daily calorie needs;

  //also any custom nutrition information

}