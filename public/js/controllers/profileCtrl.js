angular.module('profileCtrl', [])
  .controller('ProfileController', ['$scope', 'User', function($scope, User) {

    $scope.hello = "Welcome! You made it to the Profile controller !";

    // Get user data
    User.get().then(function(user) {

      // set user details
      $scope.user = user.data;

      console.log($scope.user);
    });

  }]);
