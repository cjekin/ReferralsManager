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
    $urlRouterProvider.otherwise("/pages/dashboard");
    
    // Routing
    $stateProvider

        // Blank page views
        .state('root', {
            abstract: true,
            url: "/common",
            templateUrl: "static/pages/app_views/blankpage.html",
            data: {
                pageTitle: 'Common'
            }
        })
        .state('root.login', {
            url: "/login",
            templateUrl: "static/pages/auth/login.html",
            data: {
                pageTitle: 'Login page',
                pageDesc: 'Search for an assay from the system libraries.'
            },
            params: { 
              'toState': 'pages.dashboard', // default state to proceed to after login
              'errorMessages': ''
            },
            controller: 'loginCtrl as loginCtrl'
        })


        // App views (headers and footers)
        .state('pages', {
            abstract: true,
            url: "/pages",
            templateUrl: "static/pages/app_views/content.html",
            data: {
                pageTitle: 'App Views'
            }
        })

        // Dashboard - Main page
        .state('pages.dashboard', {
            url: "/dashboard",
            templateUrl: "static/pages/dashboard/dashboard.html",
            data: {
                pageTitle: 'Welcome to HSL Assay Finder',
                //pageDesc: 'Search for an assay from the system libraries.',
            }
        })
    
        // Search page
        .state('pages.search', {
            url: "/search",
            templateUrl: "static/pages/search/search.html",
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
                $state.go('root.login', {'toState': thisStateName, 'errorMessages': error.message});
            }, 0);
        }
        return false;
    });
}

