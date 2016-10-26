//
// Authorisation services: Login page, interceptors and authentication service
//


angular.module('homer')
    .factory('authService', authService)
    //.factory('authInterceptor', authInterceptor)
    //.config(['$httpProvider', function($httpProvider) {
    //    $httpProvider.interceptors.push('authInterceptor');
    //}])
    .controller('loginCtrl', loginCtrl)
      

authService.$inject = ['$http', '$q', '$window'];
//authInterceptor.$inject = ['$q', 'authService'];
loginCtrl.$inject = ['$timeout', '$state', 'authService'];


function authService($http, $q, $window) {
    var authService = {};
    var session;

    var loginURL = 'api/v1/auth/login/';
    //var loginURL = '//referrals-manager-cjekin.c9users.io:8081/api/v1/auth/login/';
    //var loginURL = 'https://138.68.151.64:8081/api/v1/auth/login/';
    //var loginURL = 'https://www.referralsmanager.co.uk:8081/api/v1/auth/login/';

    authService.login = function(username, password) {
        var deferred = $q.defer();
        var queryURL = loginURL;

        $http.defaults.headers.common['Authorization'] = 'Basic ' + window.btoa(username + ':' + password);

        $http.post(queryURL)
            .then(function(result) {
                session = result.data;
                $http.defaults.headers.common['Authorization'] = '';
                $window.sessionStorage["session"] = JSON.stringify(session);
                deferred.resolve(session);
            }, function(error) {
                console.log(error);
                $http.defaults.headers.common['Authorization'] = '';
                deferred.reject(error);
            });

        return deferred.promise;
    }


    authService.isAuthenticated = function() {
        if (session.token) {
            return session.user;
        } else if($window.sessionStorage["session"]) {
            session = $window.sessionStorage["session"];
            return session.user;
        } else {
            return false;   
        }
    };

    // authService.isAuthorized = function(authorizedRoles) {
    //     if (!angular.isArray(authorizedRoles)) {
    //         authorizedRoles = [authorizedRoles];
    //     }
    //     return (authService.isAuthenticated() &&
    //         authorizedRoles.indexOf(Session.userRole) !== -1);
    // };

    return authService
}


function loginCtrl($timeout, $state, authService) {
    console.log('Running loginCtrl');
    var self = this;

    self.login = function() {
        console.log('Login with credentials: ', self.username, self.password);

        authService.login(self.username, self.password)
        .then(function(data) {
            // on good username and password
            $timeout(function() {
                $state.go('dashboard');
            });
            console.log('Successful login');
        })
        .catch(function(data) {
            // on incorrect username and password
            console.log('Message from server: ', data.data.detail);
        });
    };
}