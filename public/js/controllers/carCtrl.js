angular.module('carCtrl', [])
  .controller('CarController', ['$scope', 'User', 'Record', function($scope, User, Record) {

    $scope.hello = "Welcome! You made it to the car controller !";

    function getData() {
      // get user data
      User.get().then(function(user) {
        $scope.user = user.data;
        console.log($scope.user);
      });
    }

    // post a new record
    $scope.submit = function() {
      if ($scope.miles && $scope.gallons) {
        $scope.mpg = $scope.miles/$scope.gallons;

        $scope.car = User.getCar().car;

        console.log($scope.miles);
        console.log($scope.gallons);
        console.log($scope.mpg);
        console.log($scope.car);
        console.log($scope.user.details.email);

        Record.addRecord({
          car : $scope.car,
          mpg : $scope.mpg,
          miles : $scope.miles, // get miles value defined above
          gallons : $scope.gallons, // get gal value from above
          email: $scope.user.details.email
        }).then(function() {
          getData();
          $scope.miles = '';
          $scope.gallons = '';
        });
      }
    };

    getData();
  }]);
