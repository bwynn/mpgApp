angular.module('appRoutes', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/views/signup.html',
        controller: 'SignupController'
      }).
      when('/signup', {
        templateUrl: '/views/signup.html',
        controller: 'SignupController'
      }).
      when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginController'
      }).
      when('/logout', {
        templateUrl: '/views/logout.html',
        controller: 'LogoutController'
      }).
      when('/profile/', {
        templateUrl: '/views/profile.html',
        controller: 'ProfileController'
      }).
      when('/profile/:model', {
        templateUrl: '/views/car.html',
        controller: 'CarController'
      })

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
  }]);
