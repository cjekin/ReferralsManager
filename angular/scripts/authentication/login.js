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
        if(!usergroups){
            console.log('User session is undefined');
            return false;
        }
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
    
    
    function refreshToken(session) {
        $http.post('api/v1/auth/refresh/', { token: session.token })
            .then(function(result) {
                session = result.data;
                console.log('Refreshed session token', session);
                $window.sessionStorage["session"] = JSON.stringify(session);
            }, function(error) {
                console.log('Error refreshing token: ', error);
            });
    }

    
    authService.isAuthorized = function(allowedGroups) {
        var deferred = $q.defer();
        
        console.log('Called isAuthorized');
            
        // If there isn't a session in memory, check the local storage
        console.log('Session: ', session);
        console.log('Local stored session: ', $window.sessionStorage["session"]);
        if(!session && $window.sessionStorage["session"]){
            console.log('Getting session from window');
            session = JSON.parse($window.sessionStorage["session"]);    
        }
        
        // Check the user has the right privilages
        if(session){
            var userGroupAuthorised = checkGroupIsAuthorized(session.user.groups, allowedGroups);
            console.log('User group authorised');
        } else {
            console.log('User group not authorised');
            userGroupAuthorised = false;
        }
        

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
