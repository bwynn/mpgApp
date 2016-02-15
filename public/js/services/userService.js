angular.module('UserService', [])
  .factory('User', ['$http', function($http) {
    return {
      get: function() {
        return $http.get('/api/profile');
      },
      post: function(userData) {
        return $http.post('/api/profile', userData);
      },
      put: function(userData) {
        return $http.put('/api/profile', userData);
      },
      delete: function() {
        return $http.delete('/api/profile');
      },
      getCar: function(userCar) {
        return {car: userCar}
      }
    };
  }]);
