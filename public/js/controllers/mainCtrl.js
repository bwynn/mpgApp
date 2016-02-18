angular.module('mainCtrl', [])
  .controller('MainController', ['$scope', '$rootScope', function($scope, $rootScope) {
    // handle communication between scopes
    $rootScope.$on('handleEmit', function(event, args) {
      // 1console.log(args.car);
      $rootScope.car = args.car;
    });

    $rootScope.$on('carAvgEmit', function(event, args) {
      $rootScope.avg = args.avg;
    })

  }]);
