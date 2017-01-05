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

    // Food search
    // $stateProvider.state({
    //     name: 'food.search',
    //     url: '/id:?name',
    //     params: {
    //         view: { dynamic: true }
    //     },
    //     resolve: {
    //         id: ['transition$', t => t.params().id],
    //         view: ['$transition$', t => t.params().view || 'search']
    //     },
    //     component: 'foodSearch'
    // });

    // // Food add
    // $stateProvider.state({
    //     name: 'food.add',
    //     url: '/id:?name',
    //     params: {
    //         view: { dynamic: true }
    //     },
    //     resolve: {
    //         id: ['transition$', t => t.params().id],
    //         view: ['$transition$', t => t.params().view || 'add']
    //     },
    //     component: 'newFood'
        
    // });


    // $stateProvider.state({
    //     name
    // })

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

    $stateProvider.state({
        name: 'logout',
        url: '/logout',
        data: { public: true },
        component: 'logout'
    });

    $urlRouterProvider.otherwise('/');
}

