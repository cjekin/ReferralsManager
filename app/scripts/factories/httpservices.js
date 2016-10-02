/**
 *
 *  Database services
 *
 */


angular.module('homer')
    .factory('searchAssayList', ['$http', searchAssayList]);


function searchAssayList($http) {
	var self = this;
	self.items = [];
	
	console.log('Running GET controller');
	var rest_url = 'https://flask-simple-api-cjekin.c9users.io/mock/api/v1.0/assays'
	
	return $http.get(rest_url).then(function (response) {
		self.items = response.data.cases;
	}, function (errResponse) {
		console.error('Error while fetching notes');
	});
};