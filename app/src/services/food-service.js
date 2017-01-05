
foodService.$inject = ['$http', 'apiUrl'];

export default function foodService($http, apiUrl) {
    return {
        get() {
            return $http.get(`${apiUrl}/foods`)
                .then(res => res.data);
        },
        add(food) {
            return $http.post(`${apiUrl}/foods`, foods)
                .then(res => res.data);
        }
    };
};
