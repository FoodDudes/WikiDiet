import angular from 'angular';
import './scss/main.scss';
import components from './components';
import services from './services';
import uiRouter from 'angular-ui-router';
import routes from './routes'; 

const app = angular.module('myApp', [components, services, uiRouter]);

const apiUrl = process.env.API_URL || 'https://wikidiet.herokuapp.com/api';

app.value('apiUrl', apiUrl);

app.config(routes);

//route debugger
app.run(function($rootScope) {
    // console methods are now pre-bound to console :) (not sure about support across browsers)
    $rootScope.$on('$stateChangeError', console.log.bind(console));
});

