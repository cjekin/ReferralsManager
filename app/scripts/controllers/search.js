/**
 *
 *  Assay Search Page
 *
 */

angular.module('homer')
    .controller('searchCtrl', ['$log', searchCtrl])
    //.controller('searchAssayList', ['$http', searchAssayList]);


function searchCtrl($log) {
    
    var self = this;
    
    self.removeFilters = false;
    
    self.searchText = '';
    
    self.allSystems = ['LNWH', 'UCLH & North Mid', 'TDL', 'Regional', 'Cromwell', 'Royal Free'];
    self.selectedSystems = ['LNWH', 'UCLH & North Mid', 'TDL', 'Regional', 'Cromwell', 'Royal Free'];
    
    self.allSamples = ['Serum','EDTA','Lithium Heparin','Urine Random','Urine 24h','Urine 24h Acid'];
    self.selectedSamples = ['Serum'];
    
    self.useAlias = true;
    
    self.submit = function() {
        if(self.removeFilters == false){
            console.log('Search Text: ', self.searchText);
            console.log('Systems: ', self.selectedSystems);
            console.log('Samples: ', self.selectedSamples);
            console.log('UseAlias: ', self.useAlias);
            //$log.log($rootScope.rest_api_url);
        } else {
            console.log('Search Text: ', self.searchText);
        };
        
    };
    
};
