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
                    console.log('what was found in userfood:', userfood);
                    user.userfood = userfood[0];
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('userFoodUserName', user.userName);
                    $state.go('home');
                });
            })
            .catch(error => {
                this.error = error;
            });        
    };
};
