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
                .then((userfood) => {
                    user.userfood = userfood;
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('userFoodUserName', user.userfood[0].username);
                    $state.go('home');
                });
            })
            .catch(error => {
                this.error = error;
            });        
    };
};
