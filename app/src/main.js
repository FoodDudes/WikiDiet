import angular from 'angular';
import './scss/main.scss';
import components from './components';
import services from './services';
import uiRouter from 'angular-ui-router';
// import defaultRoute from 'angular-ui-router-default';
// import resource from 'angular-resource';
// import http from './auth/http';
// import auth from './auth/auth';
import routes from './routes'; 
// need this for old $stateChanged events,
// however, we need to manually grab the module 
// from angular (see below) as it is not 
// exported from this import 
import 'angular-ui-router/release/stateEvents';

const app = angular.module('myApp', [components, services, uiRouter]);

const apiUrl = 'https://wikidiet.herokuapp.com/api/';

app.value('apiUrl', apiUrl);

// app.config(http);
app.config(routes);
// app.run(auth);

//route debugger
app.run(function($rootScope) {
    $rootScope.$on('$stateChangeError', console.log.bind(console));
});

