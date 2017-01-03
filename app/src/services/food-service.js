
foodService.$inject = ['$http', 'apiUrl'];

export default function foodService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/foods`)
                .then(res => res.data);
        },
        add(food) {
            return $http.post(`${apiUrl}/foods`, food)
                .then(res => res.data);
        }
    };
};
