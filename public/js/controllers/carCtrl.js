angular.module('carCtrl', [])
  .controller('CarController', ['$scope', 'User', 'Record', 'Car', '$rootScope', function($scope, User, Record, Car, $rootScope) {

    $scope.hello = "Welcome! You made it to the car controller !";

    // store values
    $scope.$watch(function() {
      return $rootScope;
    }, function() {
      // console.log($rootScope.car);
      // console.log($rootScope.avg);
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
        //console.log($scope.miles);
        //console.log($scope.gallons);
        //console.log($scope.mpg);
        //console.log($scope.car.model);
        //console.log($scope.user.local.email);

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
        }).then(function() {
          var newAvg = 0;
          // update avg
          newAvg += $scope.mpg;
          console.log(newAvg);
          newAvg += parseInt($scope.avg);
          console.log(newAvg);
          $scope.avg = (newAvg/2).toFixed(2);
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
