authService.$inject = ['tokenService', '$http', 'apiUrl'];

export default function authService(token, $http, apiUrl){
    const current = token.get();
    if(current){
        $http 
            .get(`${apiUrl}/auth/verify`)
            .catch(() => token.remove());
    }

    function credential(endpoint){
        return (credentials) => {
            return $http.post(`${apiUrl}/auths/${endpoint}`, credentials)
            .then(result => {
                token.set(result.data.token);
            })
            .catch(err => {
                throw err.data;
            });
        };
    }

    return {
        isAuthenticated(){
            return !!token.get();
        },
        logout() {
            token.remove();
        },
        login: credential('login'),
        signup: credential('signup')
    };
}