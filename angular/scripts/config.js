/**
 * Referrals Manager
 * version 1.0
 * Config: Routing
 */

angular
    .module('homer')
    .config(configState)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
    

function configState($stateProvider, $urlRouterProvider, $compileProvider) {
    
    // Optimize load start with remove binding information inside the DOM element
    $compileProvider.debugInfoEnabled(true);

    // Set default state
    $urlRouterProvider.otherwise("/dashboard");
    
    // Routing
    $stateProvider

        // Dashboard - Main page
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "static/views/dashboard.html",
            data: {
                pageTitle: 'Dashboard',
            }
        })
    

        // App views
        .state('app_views', {
            abstract: true,
            url: "/app_views",
            templateUrl: "static/views/common/content.html",
            data: {
                pageTitle: 'App Views'
            }
        })

        .state('app_views.search', {
            url: "/search",
            templateUrl: "static/views/app_views/search.html",
            data: {
                pageTitle: 'Library Search',
                pageDesc: 'Search for an assay from the system libraries.'
            },
            controller: 'searchCtrl as searchCtrl',
            resolve: {
                //auth: checkIfAuthenticated
                auth: function checkIfAuthenticated(authService, $state) {
                    console.log('Called checkIfAuthenticated');
                    authService.isAuthenticated();
                    //setTimeout(()=>{$state.go('common.login')},0);
                    return true;
                }
            }
        })
        
        
        // Common views
        .state('common', {
            abstract: true,
            url: "/common",
            templateUrl: "static/views/common/content_empty.html",
            data: {
                pageTitle: 'Common'
            }
        })
        .state('common.login', {
            url: "/login",
            templateUrl: "static/views/common_app/login.html",
            data: {
                pageTitle: 'Login page',
                specialClass: 'blank'
            },
            controller: 'loginCtrl',
            controllerAs: 'loginCtrl'
        })


}


function checkIfAuthenticated(authService, $state) {
    console.log('Called checkIfAuthenticated');
    authService.isAuthenticated();
    //setTimeout(()=>{$state.go('common.login')},0);
}




function _redirectIfNotAuthenticated($q, $state, $auth) {
    var defer = $q.defer();
    if (authService.getSessionToken()) {
        defer.resolve(); /* (3) */
    }
    else {
        $timeout(function() {
            $state.go('login'); /* (4) */
        });
        defer.reject();
    }
    return defer.promise;
}


// function _redirectIfNotAuthenticated($q, $state, $timeout, authService) {
//     //var userInfo = authService.isAuthenticated();
//     authService.isAuthenticated().then(function(response){
//         console.log('isAuthenticated returned: ', response);
//     });
    
//     if (userInfo) {
//         return $q.when(userInfo);
//     }
//     else {
//         $timeout(function() {
//             console.log('Not authenticated');
//             //$state.go('common.login');
//         });
//         return $q.reject({
//             authenticated: false
//         });
//     }
// }




// ['$q', '$state', '$timeout', 'authService', function ($q, $state, $timeout, authService) {
//                   var userInfo = authService.getCurrentUser();
//                   if (userInfo){
//                       return $q.when(userInfo);
//                   } else {
//                       $timeout(function() {
//                           $state.go('common.login');
//                       });
//                       return $q.reject({ authenticated: false });
//                   }
//               }]