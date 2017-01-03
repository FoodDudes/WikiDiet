routes.$inject = ['$stateProvider', '$urlRouterProvider']; 

export default function routes($stateProvider, $urlRouterProvider) {
    
    $stateProvider.state({
        name: 'home',
        url: '/',
        data: { public: true },
	    component: 'home' 
    });

    $stateProvider.state({
        name: 'food',
        url: '/food',
        data: { public: true },
	    component: 'food' 
    });

    $stateProvider.state({
        name: 'me',
        url: '/me',
        data: { public: false },
	    component: 'me' 
    });

    $stateProvider.state({
        name: 'favorites',
        url: '/favorites',
        data: { public: false },
	    component: 'favorites' 
    });

    $stateProvider.state({
        name: 'login',
        url: '/login',
        data: { public: true },
        component: 'login'
    });

    $stateProvider.state({
        name: 'signup',
        url: '/signup',
        data: { public: true },
        component: 'signUp'
    });

    $urlRouterProvider.otherwise('/');
}

