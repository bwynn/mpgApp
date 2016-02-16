angular.module('profileCtrl', [])
  .controller('ProfileController', ['$scope', 'User', '$location', function($scope, User, $location) {

    $scope.hello = "Welcome! You made it to the Profile controller !";

    // Get user data
    User.get().then(function(user) {
      // set user details
      $scope.user = user.data;
    });

    $scope.submit = function(car) {
      console.log(car); //
      $scope.$emit('handleEmit', {model: car});
    };

  }]);
