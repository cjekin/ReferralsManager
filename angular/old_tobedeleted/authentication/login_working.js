angular.module('homer')
    .factory('authService', authService)
    .controller('loginCtrl', loginCtrl);

authService.$inject = ['$http', '$q', '$window'];
loginCtrl.$inject = ['authService'];


function authService($http, $q, $window) {
    var userInfo;

    var loginURL = 'https://referrals-manager-cjekin.c9users.io:8081/api/v1/auth/login/';

    function login(username, password) {
        var deferred = $q.defer();
        var queryURL = loginURL;

        console.log({'Authorization': 'Basic ' + window.btoa(username + ':' + password)});
        $http.defaults.headers.common['Authorization'] = 'Basic ' + window.btoa(username + ':' + password);
        //$http.defaults.headers.post['Authorization'] = 'Basic ' + window.btoa(username + ':' + password);
        //$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        
        
        $http.post(queryURL)
        // $http.post(queryURL, {
        //     headers: {
        //         'Authorization': 'Basic dGVzdHVzZXI6bm90c2VjdXJlMTIz'
        //         //'Authorization': 'Basic ' + window.btoa(username + ':' + password)
        //         //'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // })
        
        // $http({
        //     method: 'POST',
        //     url: queryURL,
        //     headers: {
        //         //'Content-Type': 'application/x-www-form-urlencoded',
        //         'Authorization': 'Basic ' + window.btoa(username + ':' + password),
        //         'Accept': 'application/json; charset=utf-8',
        //         'Content-Type': 'application/json; charset=utf-8'
        //     }
        //     })
            
        .then(function(result) {
            console.log(result);
            //userInfo = {}
            //     accessToken: result.data.access_token,
            //     username: result.data.username
            // };
            // $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
            //deferred.resolve(userInfo);
        }, function(error) {
            console.log(error);
            //deferred.reject(error);
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




// app.service("UserLoginAPI", function($http, AppConstants, Base64) {
//     this.doLogin = function() {
//         var _url = AppConstants.webServiceUrl + "/users/testaWS.json?callback=JSON_CALLBACK";
//         var _authdata = Base64.encode('admin' + ':' + 'admin');

//         var _headers = {
//             'Authorization': 'Basic ' + _authdata,
//             'Accept': 'application/json; charset=utf-8',
//             'Content-Type': 'application/json; charset=utf-8'
//         };

//         return $http({
//             method: 'jsonp',
//             url: _url,
//             responseType: "json",
//             headers: _headers
//         });
//     };
// });


// I had the same problem using asp.net MVC and found the solution here

// There is much confusion among newcomers to AngularJS as to why the  $http service shorthand functions ($http.post(), etc.) don’t appear to be swappable with the jQuery equivalents (jQuery.post(), etc.)

// The difference is in how jQuery and AngularJS serialize and transmit the data. Fundamentally, the problem lies with your server language of choice being unable to understand AngularJS’s transmission natively ... By default, jQuery transmits data using

// Content-Type: x-www-form-urlencoded
// and the familiar foo=bar&baz=moe serialization.

// AngularJS, however, transmits data using

// Content-Type: application/json 
// and { "foo": "bar", "baz": "moe" }

// JSON serialization, which unfortunately some Web server languages—notably PHP—do not unserialize natively.
// Works like a charm.

// CODE
// Your app's root module...
// angular.module('MyModule', [], function($httpProvider) {
//     // Use x-www-form-urlencoded Content-Type
//     $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

//     /**
//      * The workhorse; converts an object to x-www-form-urlencoded serialization.
//      * @param {Object} obj
//      * @return {String}
//      */
//     var param = function(obj) {
//         var query = '',
//             name, value, fullSubName, subName, subValue, innerObj, i;

//         for (name in obj) {
//             value = obj[name];

//             if (value instanceof Array) {
//                 for (i = 0; i < value.length; ++i) {
//                     subValue = value[i];
//                     fullSubName = name + '[' + i + ']';
//                     innerObj = {};
//                     innerObj[fullSubName] = subValue;
//                     query += param(innerObj) + '&';
//                 }
//             }
//             else if (value instanceof Object) {
//                 for (subName in value) {
//                     subValue = value[subName];
//                     fullSubName = name + '[' + subName + ']';
//                     innerObj = {};
//                     innerObj[fullSubName] = subValue;
//                     query += param(innerObj) + '&';
//                 }
//             }
//             else if (value !== undefined && value !== null)
//                 query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
//         }

//         return query.length ? query.substr(0, query.length - 1) : query;
//     };

//     // Override $http service's default transformRequest
//     $httpProvider.defaults.transformRequest = [function(data) {
//         return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
//     }];
// });