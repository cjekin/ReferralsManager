//
// Authorisation services: Login page, interceptors and authentication service
//


angular.module('homer')
    .factory('authService', authService)
    .controller('loginCtrl', loginCtrl);
      

authService.$inject = ['$http', '$q', '$window', '$rootScope'];
loginCtrl.$inject = ['$timeout', '$state', '$rootScope', 'authService'];


function authService($http, $q, $window, $rootScope) {
    var authService = {};
    var session;

    var loginURL = 'auth/login/';
    var refreshURL = 'auth/refresh/';

    function isTokenCurrent() {
        if (session && session.token) {
            var timeToExpiry = Date.parse(session.expiry) - Date.now();
            //console.log('Token expires: ', session.expiry, ' Time to expiry: ', (timeToExpiry / 1000 / 60), ' minutes. StillGood=', (timeToExpiry / 1000 > 30));
            if (timeToExpiry / 1000 > 30) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    function checkGroupIsAuthorized(usergroups, allowedgroups) {
        if (!usergroups) {
            console.log('User session is undefined');
            return false;
        }
        var matchingGroups = [];
        for (var i = 0; i < allowedgroups.length; i++) {
            for (var j = 0; j < usergroups.length; j++) {
                if (usergroups[j] == allowedgroups[i]) {
                    matchingGroups.push(usergroups[j]);
                }
            }
        }
        if (matchingGroups.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }


    authService.login = function(username, password) {
        var deferred = $q.defer();
        var queryURL = loginURL;

        //$http.defaults.headers.common['Authorization'] = 'Basic ' + window.btoa(username + ':' + password);
        //$http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        $http.post(queryURL, {
                username: username,
                password: password
            })
            .then(function(result) {
                session = result.data;
                console.log('Got new session: ', session);
                $http.defaults.headers.common['Authorization'] = '';
                $window.sessionStorage["session"] = JSON.stringify(session);
                deferred.resolve(session);
            }, function(error) {
                $http.defaults.headers.common['Authorization'] = '';
                deferred.reject(error);
            });
        return deferred.promise;
    };

    
    authService.refreshToken = function(session) {
        var deferred = $q.defer();
        
        $http.post(refreshURL, {
                token: session.token
            })
            .then(function(result) {
                session = result.data;
                //console.log('Refreshed session token', session);
                $window.sessionStorage["session"] = JSON.stringify(session);
                deferred.resolve();
            }, function(error) {
                //console.log('Error refreshing token: ', error);
                deferred.reject(error);
            });
        return deferred;
    };


    authService.isAuthorized = function(allowedGroups) {
        var deferred = $q.defer();

        console.log('Called isAuthorized');

        // If there isn't a session in memory, check the local storage
        if (!session && $window.sessionStorage["session"]) {
            //console.log('Getting session from window');
            session = JSON.parse($window.sessionStorage["session"]);
            $rootScope.logged_in_user = session.user.first_name + ' ' + session.user.last_name;
        }
        
        // Check if they have a session
        if(!session){
            //console.log('No session found');
            var errorMessage = {
                error: 'no_session',
                message: 'You are not logged in.'
            }
            deferred.reject(errorMessage);
        }
        
        // Check if their token has expired
        if(!isTokenCurrent()){
            //console.log('Session expired');
            var errorMessage = {
                error: 'expired_session',
                message: 'Your session has expired.'
            }
            deferred.reject(errorMessage);
        }

        // Check the user has the right privilages
        var userGroupAuthorised = checkGroupIsAuthorized(session.user.groups, allowedGroups)
        if (!userGroupAuthorised) {
            //console.log('Permission denied');
            var errorMessage = {
                error: 'permission_denied',
                message: 'You do not have permission to access this area. Please contact the system administrator if this is required'
            }
            deferred.reject(errorMessage);  
        }
        
        // If everything is okay, let them through
        if(session && session.token && isTokenCurrent() && userGroupAuthorised){
            //console.log('All good. Letting you through');
            authService.refreshToken(session);
            deferred.resolve();
        }
        
        return deferred.promise;
    };

    return authService
}


function loginCtrl($timeout, $state, $rootScope, authService) {
    var self = this;
    
    console.log($state.params);
    if($state.params.errorMessages != ''){
        console.log('Found errorMessages: ', $state.params.errorMessages );
        self.passworderror = $state.params.errorMessages;
    }
    
    self.login = function() {
        var toState = $state.params.toState

        authService.login(self.username, self.password)
        .then(function(result) {
            $timeout(function() {
                $state.go(toState);
            });
            console.log('Successful login: ', result);
            $rootScope.logged_in_user = result.user.first_name + ' ' + result.user.last_name;
        }, function(error){
            if(error.status == 400) {
                self.passworderror = error.data.non_field_errors[0];
            } else {
                self.passworderror = 'Problem logging in. Please try again or contact the administrator';
            }
        });
    };
}
