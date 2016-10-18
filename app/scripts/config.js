/**
 * Referrals Manager
 * version 1.7
 * Config: Routing
 */

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
            controller: 'searchCtrl',
            controllerAs: 'form',
            resolve: {
              user: function (authService) {
                  return authService.getUserDetails();
              }
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

angular
    .module('homer')
    .config(configState)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });