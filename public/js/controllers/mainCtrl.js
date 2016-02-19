angular.module('mainCtrl', [])
  .controller('MainController', ['$scope', '$rootScope', function($scope, $rootScope) {

    // handle communication between scopes
    $rootScope.$on('handleEmit', function(event, args) {
      // 1console.log(args.car);
      $rootScope.car = args.car;
    });

    // send avg value
    $rootScope.$on('carAvgEmit', function(event, args) {
      $rootScope.avg = args.avg;
    });

    // set controller states
    $scope.closed = true;

    // navigation controls
    $scope.menuBtn = function() {
      if ($scope.closed == false) {
        $scope.closed = true;
      }
      else if ($scope.closed == true) {
        $scope.closed = false;
      }
      else {
        return console.log("somethings up with the menu toggle");
      }
    };

  }]);
