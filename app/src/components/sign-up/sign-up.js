import template from './sign-up.html';
import styles from './sign-up.scss';

export default {
    template,
    controller
};

controller.$inject = ['authService', 'userFoodsService', '$state'];

function controller(authSvc, userFoodsSvc, $state) {
    this.styles = styles;

    this.weightUnits = ['kg', 'lbs'];
    this.heightUnits = ['cm', 'inches'];

    this.credentials = {
        username: '',
        password: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        email: ''
    };

    this.$onInit = () => {
        this.weightChoice = this.weightUnits[1];
        this.heightChoice = this.heightUnits[1];        
    };

    this.findMetrics= function(){
        if (this.weightChoice === 'kg'){
            this.credentials.weight = this.weightInput*2.20462;
        }
        else if(this.weightChoice === 'lbs'){
            this.credentials.weight = this.weightInput;
        };

        if (this.heightChoice === 'cm'){
            this.credentials.height = this.heightInput*0.393701;
        }
        else if(this.heightChoice === 'inches'){
            this.credentials.height = this.heightInput;
        };
    };

    this.authenticate = () => {
        return authSvc.signup(this.credentials)
            .then((user) => {
                const newUserFood = 
                userFoodsSvc.add(this.credentials)
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
