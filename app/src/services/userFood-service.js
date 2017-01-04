
userFoodService.$inject = ['$http', 'apiUrl'];

export default function userFoodService($http, apiUrl) {
    return {
        get() {
            return $http.get(`${apiUrl}/userfoods`)
                .then(res => res.data);
        },
        getOne(username) {
            return $http.get(`${apiUrl}/userfoods/${username}`)
                .then(res => res.data);
        },        
        add(userfood) {
            return $http.post(`${apiUrl}/userfoods`,userfood)
                .then(res => res.data);
        }
    };
};
