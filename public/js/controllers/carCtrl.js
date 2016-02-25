angular.module('carCtrl', [])
  .controller('CarController', ['$scope', 'User', 'Record', 'Car', '$rootScope', function($scope, User, Record, Car, $rootScope) {

    $scope.hello = "Welcome! You made it to the car controller !";

    // store values
    $scope.$watch(function() {
      return $rootScope;
    }, function() {
      $scope.car = $rootScope.car;
      $scope.avg = $rootScope.avg;
    });

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
        $scope.avg; // set var
        var newAvg = 0; // set new total to 0
        // update avg
        newAvg += $scope.mpg; // add mpg value
        console.log(newAvg);
        newAvg += parseInt($scope.avg); // ensure avg is turned into a number and add to value
        console.log(newAvg);
        $scope.avg = (newAvg/2).toFixed(2); // set $scope.avg new value / 2


        Record.addRecord({
          car : $scope.car.model,
          mpg : $scope.mpg.toFixed(2),
          miles : $scope.miles, // get miles value defined above
          gallons : $scope.gallons, // get gal value from above
          email: $scope.user.local.email
        }).then(function() {
          getData();
          $scope.miles = '';
          $scope.gallons = '';
        });
      }
    };

    $scope.remove = function(data) {
      //console.log(data);
      //console.log($scope.user.local.email)

      Record.deleteRecord({
        "email" : $scope.user.local.email,
        "id" : data
      }).then(function() {
        getData();
      });
    };

    getData();
  }]);
