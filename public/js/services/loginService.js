angular.module('LoginService', [])
  .factory('UserLogin', ['$http', function($http) {
    return {
      post: function(userData) {
        return $http.post('/api/login', userData);
      }
    };
  }]);
