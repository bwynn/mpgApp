angular.module('carCtrl', [])
  .controller('CarController', ['$scope', 'User', function($scope, User) {

    $scope.hello = "Welcome! You made it to the car controller !";
    // get user data
    User.get().then(function(user) {
      $scope.user = user.data;
      console.log($scope.user);
    });

  }]);
