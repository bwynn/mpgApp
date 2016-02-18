angular.module('CarService', [])
  .factory('Car', ['$http', function($http) {
    return {
      addCar: function(carData) {
        return $http.put('/api/profile/add_car', carData);
      },
      removeCar: function(carData) {
        return $http.put('/api/profile/remove_car', carData);
      }
    };
  }]);
