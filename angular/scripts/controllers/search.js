/**
 *
 *  Assay Search Page
 *
 */

angular.module('homer')
    .controller('searchCtrl', ['AssaySearchFactory', searchCtrl])
    .factory('AssaySearchFactory', ['$http', '$cookies', AssaySearchFactory]);


function searchCtrl(AssaySearchFactory) {

    var self = this;
    
    self.removeFilters = false;
    
    self.searchText = '';
    
    self.allSystems = ['LNWH', 'UCLH & North Mid', 'TDL', 'Regional', 'Cromwell', 'Royal Free'];
    self.selectedSystems = ['LNWH', 'UCLH & North Mid', 'TDL', 'Regional', 'Cromwell', 'Royal Free'];
    
    self.allSamples = ['Serum','EDTA','Lithium Heparin','Urine Random','Urine 24h','Urine 24h Acid'];
    self.selectedSamples = ['Serum'];
    
    self.useAlias = true;
    
    self.data = [];
    
    self.submit = function() {
        if(self.removeFilters == false){
            
            var params = { search_text: self.searchText, systems: self.selectedSystems, samples: self.selectedSamples, usealias: self.useAlias };

            self.items = AssaySearchFactory.get(params).then(function (response) {
        		self.data = response.data;
        	}, function (errResponse) {
        		console.error('Error while running search');
        		return {error: 'Error'};
        	});
            console.log(self.items);
        } else {
            console.log('Search Text: ', self.searchText);
            //var xhr = createCORSRequest('GET', 'https://referrals-manager-cjekin.c9users.io:8081/api/v1/search/COPPER/');
            //self.items = AssaySearchFactory.get();
        }
    };
    
}



function AssaySearchFactory($http, $cookies) {
    
    $http.defaults.headers.post['X-CSRFToken'] = $cookies['csrftoken'];
    
	var self = this;
	self.items = [];
	
	var rest_url = 'https://referrals-manager-cjekin.c9users.io:8081/'
	var search_endpoint = 'api/v1/search/'
	
	return {
	    get: function(params_data) {
	        var config = { 
	            withCredentials: true,
	            params: params_data
	        };
	        console.log('Assay Search Config', config, 'CSRF token: ', $cookies['csrftoken']);
	        
	        return $http.get(rest_url + search_endpoint, config);
	    }
	};
};
