import template from './me.html';

export default {
    template,
    controller
};

function controller() {


    this.currentUser = JSON.parse(localStorage.getItem('user'));

 


 
    console.log(this.currentUser);

 
   //AJ's formula will go here to calculate a person's daily calorie needs;
 
   //also any custom nutrition informationconsole.log(this.currentUser);

}