
userFoodsService.$inject = ['$http', 'apiUrl'];

export default function userFoodsService($http, apiUrl) {
    return {
        get() {
            return $http.get(`${apiUrl}/userFoods`)
                .then(res => res.data);
        },
        getById(userId) {
            console.log('in userfoodsservice');
            console.log(apiUrl);
            return $http.get(`${apiUrl}/userFoods/${userId}`)
                .then(res => res.data);
        },
        addMeal(userId, eaten){
            console.log('in addMeal');
            return $http.put(`${apiUrl}/userFoods/${userId}`, eaten)
                .then(res => res.data);
        }
    };
};
