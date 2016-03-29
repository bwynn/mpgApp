angular.module('mainCtrl', ['ngAnimate'])
  .controller('MainController', ['$scope', '$rootScope', function($scope, $rootScope) {

    // set default logged in value
    $rootScope.loggedIn = false;

    // handle communication between scopes
    $rootScope.$on('handleEmit', function(event, args) {
      // 1console.log(args.car);
      $rootScope.car = args.car;
    });

    // send avg value
    $rootScope.$on('carAvgEmit', function(event, args) {
      $rootScope.avg = args.avg;
    });

    $rootScope.$on('userLoggedIn', function(event, args) {
      $rootScope.loggedIn = true;
    });

    $scope.loggedOut = function() {
      $rootScope.loggedIn = false;
    };

    // set controller states
    $scope.closed = true;
    $scope.open = '';

    // navigation controls
    $scope.menuBtn = function() {
      if ($scope.closed == false) {
        $scope.closed = true;
        $scope.open = '';
      }
      else if ($scope.closed == true) {
        $scope.closed = false;
        $scope.open = 'opened';
      }
      else {
        return console.log("somethings up with the menu toggle");
      }
    };

  }]);
