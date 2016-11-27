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
    ])
    .controller('appCtrl', appCtrl)
    .controller('contentCtrl', contentCtrl);
    
    function appCtrl($http, $scope, $rootScope) {
        var self = this;
        self.logged_in_user = $rootScope.logged_in_user;
    }
    
    function contentCtrl($http, $scope, $rootScope) {
    
    }
    
})();

