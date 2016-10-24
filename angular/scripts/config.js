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
    $stateProvider

        // Dashboard - Main page
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            data: {
                pageTitle: 'Dashboard',
            }
        })
    

        // App views

        .state('app_views', {
            abstract: true,
            url: "/app_views",
            templateUrl: "views/common/content.html",
            data: {
                pageTitle: 'App Views'
            }
        })

        .state('app_views.search', {
            url: "/search",
            templateUrl: "views/app_views/search.html",
            data: {
                pageTitle: 'Library Search',
                pageDesc: 'Search for an assay from the system libraries.'
            },
            controller: 'searchCtrl as searchCtrl',
            resolve: {
             auth: _redirectIfNotAuthenticated
            }
        })
        
        
        // Common views
        .state('common', {
            abstract: true,
            url: "/common",
            templateUrl: "views/common/content_empty.html",
            data: {
                pageTitle: 'Common'
            }
        })
        .state('common.login', {
            url: "/login",
            templateUrl: "views/common_app/login.html",
            data: {
                pageTitle: 'Login page',
                specialClass: 'blank'
            },
            controller: 'loginCtrl',
            controllerAs: 'loginCtrl'
        })


}





// function _redirectIfNotAuthenticated($q, $state, $auth) {
//     var defer = $q.defer();
//     if (authService.getSessionToken()) {
//         defer.resolve(); /* (3) */
//     }
//     else {
//         $timeout(function() {
//             $state.go('login'); /* (4) */
//         });
//         defer.reject();
//     }
//     return defer.promise;
// }


function _redirectIfNotAuthenticated($q, $state, $timeout, authService) {
    var userInfo = authService.isAuthenticated();
    console.log('userInfo', userInfo);
    if (userInfo) {
        return $q.when(userInfo);
    }
    else {
        $timeout(function() {
            $state.go('common.login');
        });
        return $q.reject({
            authenticated: false
        });
    }
}




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