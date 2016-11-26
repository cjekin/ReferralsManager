//
// Authorisation services: Login page, interceptors and authentication service
//


angular.module('homer')
    .factory('authService', authService)
    .controller('loginCtrl', loginCtrl);
      

authService.$inject = ['$http', '$q', '$window'];
loginCtrl.$inject = ['$timeout', '$state', 'authService'];


function authService($http, $q, $window) {
    var authService = {};
    var session;

    var loginURL = 'api/v1/auth/login/';
    
    function isTokenCurrent(){
        if(session && session.token){
            var timeToExpiry = Date.parse(session.expiry) - Date.now();
            console.log('Token expires: ', session.expiry, ' Time to expiry: ', (timeToExpiry/1000/60), ' minutes. StillGood=', (timeToExpiry/1000 > 30));
            if(timeToExpiry/1000 > 30){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    function checkGroupIsAuthorized(usergroups, allowedgroups){
        var matchingGroups = [];
        for(i=0;i<allowedgroups.length;i++){
            for(j=0;j<usergroups.length;j++){
                if(usergroups[j] == allowedgroups[i]){
                    matchingGroups.push(usergroups[j]);
                }
            }
        }
        console.log('Matching groups: ', matchingGroups);
        if(matchingGroups.length > 0){
            return true;
        } else {
            return false;
        }
    }


    authService.login = function(username, password) {
        var deferred = $q.defer();
        var queryURL = loginURL;

        //$http.defaults.headers.common['Authorization'] = 'Basic ' + window.btoa(username + ':' + password);
        //$http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        $http.post(queryURL, {username:username, password:password})
            .then(function(result) {
                session = result.data;
                console.log('Got new session: ', session);
                $http.defaults.headers.common['Authorization'] = '';
                $window.sessionStorage["session"] = JSON.stringify(session);
                deferred.resolve(session);
            }, function(error) {
                console.log(error);
                $http.defaults.headers.common['Authorization'] = '';
                deferred.reject(error);
            });

        return deferred.promise;
    };

    
    authService.isAuthorized = function(allowedGroups) {
        var deferred = $q.defer();
        
        console.log('Called isAuthorized', allowedGroups);
            
        // If there isn't a session in memory, check the local storage
        session = (session || JSON.parse($window.sessionStorage["session"]));
        
        var userGroupAuthorised = checkGroupIsAuthorized(session.user.groups, allowedGroups);
        
        if (session && session.token && isTokenCurrent) {
            $http.post('api/v1/auth/refresh/', {token: session.token})
                .then(function(result){
                    session = result.data;
                    console.log('Refreshed session token', session);
                    $window.sessionStorage["session"] = JSON.stringify(session);
                    
                    if(userGroupAuthorised){
                        deferred.resolve();
                    } else {
                        var errorMessage = {
                            error: 'permission_denied',
                            message: 'You do not have permission to access this area. Please contact the system administrator if this is required'
                        }
                        deferred.reject(errorMessage);
                    }
                    
                }, function(error){
                    console.log('Problem', error);
                    var errorMessage = {
                        error: 'server_error',
                        message: 'There was an error contacting the server. Please make a note of the details and try again.',
                        debug: error
                    }
                    deferred.reject(errorMessage);
                });
        } else {
            console.log('No session found');
            var errorMessage = {
                error: 'no_session',
                message: 'You are not logged in, or your session has expired.'
            }
            deferred.reject(errorMessage);
        }
        return deferred.promise;
    };
    
    // Result from CodeMentor session 26/11/16 with James (Working)
    // authService.isAuthorized = function(allowedRoles) {
    //     var deferred = $q.defer();
        
    //     console.log('Called isAuthorized', session);
    //     if (session && session.token) {
    //         console.log('Found an active session token', session.token);
    //         $http.post('api/v1/auth/refresh/', {token: session.token})
    //             .then(function(result){
    //                 console.log('Good', result);
                    
    //                 session.token = result.token;
    //                 deferred.resolve();
    //             }, function(error){
    //                 console.log('Problem', error);
    //                 deferred.reject(error);
    //             });
    //     } else {
    //         console.log('No session found');
    //         deferred.reject('No session found');
    //     }
    //     console.log('Exiting isAuthenticated function');
    //     return deferred.promise;
    // };
    
    return authService
}


function loginCtrl($timeout, $state, authService) {
    var self = this;
    
    self.login = function() {
        console.log('Login with credentials: ', self.username, self.password);
        var toState = $state.params.toState

        authService.login(self.username, self.password)
        .then(function(data) {
            // on good username and password
            $timeout(function() {
                $state.go(toState);
            });
            console.log('Successful login');
        })
        .catch(function(data) {
            // on incorrect username and password
            console.log('Message from server: ', data.data.detail);
        });
    };
}
