/**
 * Referrals Manager
 * version 1.0
 * Config: Routing
 */

angular
    .module('homer')
    .config(configState)
    .run(['$rootScope', '$state', 'authService', function($rootScope, $state, authService) {
        $rootScope.$state = $state;
        // $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        //     console.log('*** $stateChangeSuccess: ', from);
        //     $rootScope.$previousState = from;
        // });
        // $rootScope.$on('$stateChangeStart', function (fromState, toState, $state, authService) {
        //     console.log('*** $stateChangeStart: ', fromState, toState);
        //     checkIfAuthorized2(fromState, toState, $state, authService);
        // });
    }]);
    

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
            controller: 'searchCtrl as searchCtrl',
            data: {
                pageTitle: 'Library Search',
                pageDesc: 'Search for an assay from the system libraries.',
                allowedGroups: ['labadmin']
            }
            ,resolve: {
                auth: checkIfAuthorized
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
                pageDesc: 'Search for an assay from the system libraries.'
            },
            params: { 
              'toState': 'dashboard', // default state to proceed to after login
            },
            controller: 'loginCtrl as loginCtrl'
        })


}



function checkIfAuthorized(authService, $state, $rootScope) {
    console.log('Called checkIfAuthorized');
    var allowedGroups = this.data.allowedGroups;
    var thisStateName = this.self.name;
    
    return authService.isAuthorized(allowedGroups).then(function(result) {
        return true;
    }, function(error) {
        console.log('authService returned error', error);
        if(error.error == 'permission_denied'){
            $state.go('dashboard');
            alert(error.message);
        } else {
            setTimeout(() => {
                $state.go('common.login', {'toState': thisStateName});
            }, 0);
        }
        return false;
    });
}

