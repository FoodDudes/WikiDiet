
userFoodsService.$inject = ['$http', 'apiUrl'];

export default function userFoodsService($http, apiUrl) {
    return {
        get() {
            return $http.get(`${apiUrl}/userFoods`)
                .then(res => res.data);
        },
        getById(userId) {
            return $http.get(`${apiUrl}/userFoods/${userId}`)
                .then(res => res.data);
        },

        getByName(username) {
            return $http.get(`${apiUrl}/userFoods/${username}`)
            .then(res => res.data);
        },

        addMeal(userId, eaten){
            return $http.put(`${apiUrl}/userFoods/${userId}`, eaten)
                .then(res => res.data);
        },
        
        add(userfood) {
            return $http.post(`${apiUrl}/userfoods`,userfood)
                .then(res => res.data);
        }
    };
};
