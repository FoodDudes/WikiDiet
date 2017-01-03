import template from './food.html';

export default {
    template,
    controller
};

controller.$inject=['$state'];

function controller($state) {
    this.styles = styles;

    this.goToFavorites = () => {
        console.log('button clicked');
        $state.go('favorites');
    };
}