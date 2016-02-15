angular.module('profileCtrl', [])
  .controller('ProfileController', ['$scope', 'User', '$location', function($scope, User, $location) {

    $scope.hello = "Welcome! You made it to the Profile controller !";

    // Get user data
    User.get().then(function(user) {
      // set user details
      $scope.user = user.data;
    });

    $scope.submit = function() {
      for (var i = 0; i < $scope.user.details.car.length; i++) {
        User.getCar($scope.user.details.car[i].model);
      }
    };

  }]);
