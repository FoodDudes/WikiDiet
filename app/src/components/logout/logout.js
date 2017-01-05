import template from './logout.html';


export default {
    template,
    controller
};

controller.$inject = ['tokenService', '$state'];

function controller(tokenService, $state) {

    console.log('before clear '+ localStorage.getItem('user')+localStorage.getItem('userFoodUserName'));
    tokenService.remove();
    localStorage.removeItem('user');
    localStorage.removeItem('userFoodUserName');
    console.log('after clear '+ localStorage.getItem('user')+localStorage.getItem('userFoodUserName'));

}