import template from './sign-up.html';

export default {
    template,
    controller
};

function controller() {
    this.weightUnits = ['kg', 'lbs'];
    this.heightUnits = ['cm', 'feet'];

    this.findMetrics= function(){
        if (this.weightChoice==='kg'){
            this.credentials.weight= weightInput*2.20462;
        }
        else if(this.weightChoice==='lbs'){
            this.credentials.weight=weightInput;
        }
        if (this.heightChoice==='cm'){
            this.credentials.height=heightInput*0.393701;
        }
        else if(this.heightChoice==='inches'){
            this.credentials.height=heightInput;
        }
    };


    this.credentials = {
        username: '',
        password: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
    };
}