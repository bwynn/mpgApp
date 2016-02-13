angular.module('signupCtrl', [])
  .controller('SignupController', ['$scope', 'UserLogin', function($scope, UserLogin) {

    $scope.hello = "Welcome! You made it to the Signup controller !";

  }]);
