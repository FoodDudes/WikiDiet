import template from './login.html';
import styles from './login.scss';

export default {
    template,
    controller
};

controller.$inject = ['authService', 'userFoodService', '$state'];

function controller(authSvc, userFoodSvc, $state) {
    this.styles = styles;
    this.credentials = {};

    this.authenticate = () => {
        return authSvc.login(this.credentials)
            .then((user) => {
                userFoodSvc.getOne(user.userName)
                .then((userfood) => {
                    user.userfood = userfood;
                    $state.go('home');
                });
            })
            .catch(error => {
                this.error = error;
            });        
    };
};
