angular.module('mainCtrl', [])
  .controller('MainController', ['$scope', '$rootScope', function($scope, $rootScope) {
    // handle communication between scopes
    $rootScope.$on('handleEmit', function(event, args) {
      // console.log(args.car);
      $rootScope.car = args.car;
    });

  }]);
