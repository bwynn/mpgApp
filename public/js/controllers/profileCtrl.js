angular.module('profileCtrl', [])
  .controller('ProfileController', ['$scope', 'User', 'Car', '$location', function($scope, User, Car, $location) {

    $scope.hello = "Welcome! You made it to the Profile controller !";
    $scope.show_car_form = false; // state form for ng-show add-car form
    $scope.arr = [];

    function getData() {
      // Get user data
      User.get().then(function(user) {
        // set user details
        $scope.user = user.data;
        console.log($scope.user);

        // get mpg records from records object
        angular.forEach($scope.user.details.record, function(mpg, index) {
          $scope.arr.push(mpg.mpg); // push it to the $scope.arr array
        });

      }).then(function() {
          var avg = 0; // set mpg value to 0
          var len = $scope.arr.length; // get length of records from array
          for (var i = 0; i < len; i++) {
            avg += $scope.arr[i]; // add value to avg value
          }
          var newAvg = avg/len;
          $scope.mpg = newAvg.toFixed(2); // set $scope.mpg val
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
        year: $scope.add_year,
        email: $scope.user.local.email
      }).then(function() {
        getData(); // update contents on page

        $scope.showCarForm = true; // set state back to true

        $scope.add_model = ''; // clear add_model
        $scope.add_brand = ''; // clear add_brand
        $scope.add_year = ''; // clear add_year
      });
    };

    $scope.removeCar = function(car_id) {
      console.log(car_id);
      console.log($scope.user.local.email);

      Car.removeCar({
        email: $scope.user.local.email,
        id: car_id
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
