import template from './app.html';
import './app.scss';

export default {
    template,
    controller
};


function controller() {
    var date = new Date();
    var datetime = date.toLocaleString();
    var dateArr = datetime.split(', ');
    //current time
    this.time = dateArr[1];
    //current day
    this.day = dateArr[0];
    console.log(this.day);
    //get request here to pull all foods from the user with this day as the eaten property and add them to the daily menu

}