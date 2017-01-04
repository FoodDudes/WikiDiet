import template from './login.html';

export default {
    template,
    controller
};

controller.$inject = ['authService', 'userFoodService', '$state'];

function controller(authSvc, userFoodSvc, $state) {
    this.credentials = {};

    this.authenticate = () => {
        return authSvc.login(this.credentials)
            .then((user) => {
                userFoodSvc.getOne(user.userName)
                .then((userFood) => {
                    user.userFood = userFood;
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('userFood', JSON.stringify(user.userFood));
                    $state.go('home');
                });
            })
            .catch(error => {
                this.error = error;
            });        
    };
};
