angular.module('LogoutService', [])
  .factory('Logout', ['$http', function($http) {
    return {
      logUserOut: function() {
        return $http.get('/api/logout');
      }
    };
  }]);
