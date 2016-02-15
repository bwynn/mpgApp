angular.module('RecordService', [])
  .factory('Record', ['$http', function($http) {
    return {
      addRecord: function(recordData) {
        return $http.put('/api/record', recordData);
      },
      deleteRecord: function(recordData) {
        return $http.put('/api/record/delete', recordData);
      }
    };
  }]);
