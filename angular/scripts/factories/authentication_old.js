//
// Authentication services for user login
// Taken from: http://jasonwatmore.com/post/2015/03/10/angularjs-user-registration-and-login-example-tutorial
//

(function() {
    'use strict';

    angular.module('homer')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];

    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            // $timeout(function() {
            //     var response;
            //     UserService.GetByUsername(username)
            //         .then(function(user) {
            //             if (user !== null && user.password === password) {
            //                 response = {
            //                     success: true
            //                 };
            //             }
            //             else {
            //                 response = {
            //                     success: false,
            //                     message: 'Username or password is incorrect'
            //                 };
            //             }
            //             callback(response);
            //         });
            // }, 1000);

            /* Use this for real authentication
             ----------------------------------------------*/
            
            console.log('Sending details to server ', username, password);
             
            $http.post('https://referrals-manager-cjekin.c9users.io:8081/api/v1/login', { username: username, password: password })
                .success(function (response) {
                    callback(response);
                });

        }

        function SetCredentials(username, password) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }

    // Base64 encoding service used by AuthenticationService
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function(input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                }
                else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function(input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

})();


(function() {
    'use strict';

    angular.module('homer')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {
        var service = {};
        
        var api_root = 'https://referrals-manager-cjekin.c9users.io:8081/api/v1/users';

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(api_root).then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get(api_root + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get(api_root + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post(api_root, user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put(api_root + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete(api_root + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function() {
                return {
                    success: false,
                    message: error
                };
            };
        }
    }

})();