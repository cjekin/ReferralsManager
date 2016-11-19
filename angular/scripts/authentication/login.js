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

        //$http.defaults.headers.common['Authorization'] = 'Basic ' + window.btoa(username + ':' + password);
        //$http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        var req = {
            method: 'POST',
            url: queryURL,
            headers: {
                'Content-Type': undefined
            },
            data: { username: username, password: password }
        };
        
        console.log(req);

        $http.post(queryURL, {username:username, password:password})
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
        console.log('Called isAuthenticated');
        if (session.token) {
            console.log('Found an active session token');
            $http.post('api/v1/auth/refresh/', {token: session.token})
                .then(function(result){
                    console.log('Good', result);
                    return session.user;
                }, function(error){
                    console.log('Problem', error);
                    return false;
                })
            
        } else {
            console.log('No session found');
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