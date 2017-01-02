routes.$inject = ['$stateProvider', '$urlRouterProvider']; 

export default function routes($stateProvider, $urlRouterProvider) {
    
	$stateProvider.state({
		name: 'home',
		url: '/',
		data: { public: true },
	    component: 'app' 
	});

	$urlRouterProvider.otherwise('/');
}

