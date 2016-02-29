angular.module('logoutCtrl', [])
  .controller('LogoutController', ['$scope', 'Logout', function($scope, Logout) {
    Logout.logUserOut().then(function() {
      $scope.thanks = "Thanks! Come back soon!";
    });
  }]);
