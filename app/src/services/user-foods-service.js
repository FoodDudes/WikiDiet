
userFoodsService.$inject = ['$http', 'apiUrl'];

export default function userFoodsService($http, apiUrl) {
    return {
        get() {
            console.log('in userfoodsservice');
            console.log(apiUrl);
            return $http.get(`${apiUrl}/userFoods`)
                .then(res => res.data);
        },
        getById(userId) {
            console.log('in userfoodsservice');
            console.log(apiUrl);
            return $http.get(`${apiUrl}/userFoods/${userId}`)
                .then(res => res.data);
        }
    };
};
