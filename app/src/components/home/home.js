import template from './home.html';
import './home.scss';

export default {
    template,
    controller
};

function controller() {

    this.currentUser = JSON.parse(localStorage.getItem('user'));

}