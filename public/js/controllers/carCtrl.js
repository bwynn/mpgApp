angular.module('carCtrl', [])
  .controller('CarController', ['$scope', 'User', 'Record', '$rootScope', function($scope, User, Record, $rootScope) {

    $scope.hello = "Welcome! You made it to the car controller !";

    // store values
    $scope.$watch(function() {
      return $rootScope.car;
    }, function() {
      console.log($rootScope.car);
      $scope.car = $rootScope.car.model;
      //$scope._id = $rootScope.car._id;
    });

    function getData() {
      // get user data
      User.get().then(function(user) {
        $scope.user = user.data;
        console.log($scope.user);
        if ($scope.user.details.record.idx) {
          $scope.idx = $scope.user.details.record.length + 1;
        }
        else {
          $scope.idx = $scope.user.details.record.idx;
        }
      });
    }

    // post a new record
    $scope.submit = function() {
      if ($scope.miles && $scope.gallons) {
        $scope.mpg = $scope.miles/$scope.gallons;

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
          email: $scope.user.details.email,
          idx: $scope.idx
        }).then(function() {
          getData();
          $scope.miles = '';
          $scope.gallons = '';
        });
      }
    };

    $scope.remove = function(data) {
      console.log(data);
      //console.log($scope.idx);
      console.log($scope.idx);

      Record.deleteRecord({
        "details.email" : $scope.user.details.email,
        "idx" : $scope.idx
      }).then(function() {
        getData();
      });
    };

    getData();
  }]);
