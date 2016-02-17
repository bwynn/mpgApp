angular.module('profileCtrl', [])
  .controller('ProfileController', ['$scope', 'User', 'Car', '$location', function($scope, User, Car, $location) {

    $scope.hello = "Welcome! You made it to the Profile controller !";
    $scope.show_car_form = false;

    function getData() {
      // Get user data
      User.get().then(function(user) {
        // set user details
        $scope.user = user.data;
      });
    }

    // send link car model up to rootScope
    $scope.setCar = function(car) {
      console.log(car);
      $scope.$emit('handleEmit', {car: car});
    };

    // add a new car to userProfile
    $scope.addNewCar = function() {
      console.log($scope.add_model);
      console.log($scope.add_brand);
      console.log($scope.add_year);

      Car.addCar({
        model: $scope.add_model,
        brand: $scope.add_brand,
        year: $scope.add_year
      }).then(function() {
        getData();
      });
    };

    // show the add car form
    $scope.showCarForm = function() {
      $scope.show_car_form = true;
    };

    getData();

  }]);
