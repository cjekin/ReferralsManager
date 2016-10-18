//
// Authentication services for user login
// Taken from: https://richardtier.com/2014/03/15/authenticate-using-django-rest-framework-endpoint-and-angularjs/
//

(function () {
    'use strict';
 
    angular
        .module('homer')
        .config(['$httpProvider','$stateProvider','loginFactory', setHttpProvider])
        .factory('loginFactory', loginFactory)
        .controller('loginCtrl', loginCtrl);

    function setHttpProvider($httpProvider, $stateProvider, loginFactory) {
        // django and angular both support csrf tokens. This tells
        // angular which cookie to add to what header.
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        
        $stateProvider
            .state('root', {
                abstract: true,
                // see controller def below
                resolve: {
                    user: function(authService) {
                        return loginFactory.auth();
                    }
                }
            })
        }
        })
        
    }
    
    function loginFactory($resource) {
        function add_auth_header(data, headersGetter) {
            // as per HTTP authentication spec [1], credentials must be
            // encoded in base64. Lets use window.btoa [2]
            var headers = headersGetter();
            headers['Authorization'] = ('Basic ' + btoa(data.username +
                ':' + data.password));
        }
        // defining the endpoints. Note we escape url trailing dashes: Angular
        // strips unescaped trailing slashes. Problem as Django redirects urls
        // not ending in slashes to url that ends in slash for SEO reasons, unless
        // we tell Django not to [3]. This is a problem as the POST data cannot
        // be sent with the redirect. So we want Angular to not strip the slashes!
        return {
            auth: $resource('https://api.twitter.com/1.1/statuses/mentions_timeline.json', {}, {
                
                login: {
                    method: 'POST',
                    transformRequest: add_auth_header
                },
                logout: {
                    method: 'DELETE'
                }
            }),
            users: $resource('https://api.twitter.com/1.1/statuses/mentions_timeline.json', {}, {
                create: {
                    method: 'POST'
                }
            })
        };
    }

    function loginCtrl(loginFactory) {
        console.log('Running loginCtrl');
        var self = this;

        // Angular does not detect auto-fill or auto-complete. If the browser
        // autofills "username", Angular will be unaware of this and think
        // the $scope.username is blank. To workaround this we use the
        // autofill-event polyfill [4][5]
        //$('#id_auth_form input').checkAndTriggerAutoFillEvent();

        self.getCredentials = function() {
            return {
                username: self.username,
                password: self.password
            };
        };

        self.login = function() {
            console.log(self.username, self.password);
            api.auth.login(self.getCredentials()).
            $promise.
            then(function(data) {
                // on good username and password
                self.user = data.username;
            }).
            catch(function(data) {
                // on incorrect username and password
                alert(data.data.detail);
            });
        };

        self.logout = function() {
            api.auth.logout(function() {
                self.user = undefined;
            });
        };
        self.register = function($event) {
            // prevent login form from firing
            $event.preventDefault();
            // create user and immediatly login on success
            api.users.create(self.getCredentials()).
            $promise.
            then(self.login).
            catch(function(data) {
                alert(data.data.username);
            });
        };
    }
 
})();
// [1] https://tools.ietf.org/html/rfc2617
// [2] https://developer.mozilla.org/en-US/docs/Web/API/Window.btoa
// [3] https://docs.djangoproject.com/en/dev/ref/settings/#append-slash
// [4] https://github.com/tbosch/autofill-event
// [5] http://remysharp.com/2010/10/08/what-is-a-polyfill/






app.factory('dataService', dataService);
dataService.$inject = ['$resource', '$location', '$log', '$q', '$httpParamSerializer', '$window', '$filter'];

function dataService($resource, $location, $log, $q, $httpParamSerializer, $window, $filter){

    // Defaults for functions
    var baseURL = "";
    // This Config is if you are testing pronghorn locally on a different port will break unit tests
    // var serviceURL = "http://localhost:8080/pronghorn/v1/";
    var serviceURL = "/pronghorn/v1/";
    var sessionURL = "sessions/";
    var session = {};
    var manifest = {};
    var qrcode = "";
    var factoryObject = {};



    factoryObject.setupConfigFile = function () {
        return $resource('script/configs.json').get().$promise.then(function(response){
            return response;
        }).catch(function(response) {
            return $q.reject(response);
        });
    };
    
    factoryObject.getStudyDescription = function(studyDescription) {

        var queryURL = baseURL + "studyDescriptions";

        return $resource(queryURL, {}, {
            get: {
                method: 'GET',
                params: {
                    'search': studyDescription
                }
            }
        }).get().$promise.then(function(response) {
            return response;
        }).catch(function(response) {
            return $q.reject(response);
        });
    };

    return factoryObject;

}



dataService.setupConfigFile().then(function(response) {
    $scope.customerConfigs = response;
});

