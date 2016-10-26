/**
 * HOMER - Responsive Admin Theme
 * version 1.7
 *
 */
(function () {
    angular.module('homer', [
         'ui.router'                 // Angular flexible routing
        ,'ngSanitize'               // Angular-sanitize
        ,'ui.bootstrap'             // AngularJS native directives for Bootstrap
        ,'ui.select'                // AngularJS ui-select
        ,'ngCookies'                // AngularJS Cookies
        //,'ngResource'
        //,'angular-flash.service'    // Message flash service used by authenticator (to be removed soon)
        //,'angular-flash.flash-alert-directive'
        //,'csrf-cross-domain'         // Third party lib for CSRF support
    ])
    
    
    
    // .run( function run( $http, $cookies ){
    //     console.log('Running CSRF function in app');
    //     $http.get('https://referrals-manager-cjekin.c9users.io:8081/api/v1/search/copper/');
    //     // For CSRF token compatibility with Django
    //     $http.defaults.headers.post['X-CSRFToken'] = $cookies['csrftoken'];
    // })
    
    .config(function($httpProvider) {
        
        // $httpProvider.defaults.headers.common = {};
        // $httpProvider.defaults.headers.post = {};
        // $httpProvider.defaults.headers.put = {};
        // $httpProvider.defaults.headers.patch = {};
        
        // var token = $('input[name=csrfmiddlewaretoken]').val();
        // console.log(token);
        // $httpProvider.defaults.headers.post['X-CSRFToken'] = token;
        
        //$httpProvider.defaults.xsrfCookieName = 'temptoken';
        //$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        
    });
    
})();

