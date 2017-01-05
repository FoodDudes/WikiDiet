import template from './logout.html';


export default {
    template,
    controller
};

controller.$inject = ['tokenService', '$state', '$rootScope'];

function controller(tokenService, $state, rootScope) {

    console.log('before clear '+ localStorage.getItem('user')+localStorage.getItem('userFoodUserName'));
    tokenService.remove();
    localStorage.removeItem('user');
    localStorage.removeItem('userFoodUserName');
    console.log('after clear '+ localStorage.getItem('user')+localStorage.getItem('userFoodUserName'));
    rootScope.$emit('logout');

}