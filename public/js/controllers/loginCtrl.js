angular.module('loginCtrl', [])
  .controller('LoginController', ['$scope', 'UserLogin', function($scope, UserLogin) {

    $scope.hello = "Welcome! You made it to the login controller !";
  }]);
