angular.module('logoutCtrl', [])
  .controller('LogoutController', ['$scope', 'Logout', '$location', function($scope, Logout, $location) {
    Logout.logUserOut().then(function() {
      alert("You have been successfully logged out.");
      $location.url('/login');
    });
  }]);
