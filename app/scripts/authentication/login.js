angular.module('homer')
    .factory('authService', authService)
    .controller('loginCtrl', loginCtrl);

authService.$inject = ['$http', '$q', '$window'];
loginCtrl.$inject = ['authService'];


function authService($http, $q, $window) {
    var userInfo;
    var sessionID;

    //var loginURL = 'https://referrals-manager-cjekin.c9users.io:8081/api/v1/auth/login/';
    var loginURL = 'http://138.68.151.64:8081/api/v1/auth/login/';

    function login(username, password) {
        var deferred = $q.defer();
        var queryURL = loginURL;

        console.log({'Authorization': 'Basic ' + window.btoa(username + ':' + password)});
        $http.defaults.headers.common['Authorization'] = 'Basic ' + window.btoa(username + ':' + password);
        
        
        $http.post(queryURL)
            .then(function(result) {
                console.log(result);
                sessionID = result.data.token;
                userInfo = result.data.user;
                
                $http.defaults.headers.common['Authorization'] = 'Basic ';
                
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                deferred.resolve(userInfo);
        }, function(error) {
            console.log(error);
            $http.defaults.headers.common['Authorization'] = 'Basic ';
            deferred.reject(error);
        });

        return deferred.promise;
    }

    return {
        login: login
    };
}


function loginCtrl(authService) {
    console.log('Running loginCtrl');
    var self = this;

    self.login = function() {
        console.log('Login with credentials: ', self.username, self.password);

        authService.login(self.username, self.password).$promise
        .then(function(data) {
            // on good username and password
            console.log(data);
        })
        .catch(function(data) {
            // on incorrect username and password
            console.log('Message from server: ', data.data.detail);
        });
    };
}



