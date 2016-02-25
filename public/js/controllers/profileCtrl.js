angular.module('profileCtrl', [])
  .controller('ProfileController', ['$scope', 'User', 'Car', '$location', function($scope, User, Car, $location) {

    $scope.hello = "Welcome! You made it to the Profile controller !";
    $scope.arr = []; // holds values for determining average

    function getData() {
      // Get user data
      User.get().then(function(user) {
        // set user details
        $scope.user = user.data;
        $scope.miles = []; // store new object values
        console.log($scope.user);

        $scope.show_car_form = false; // state form for ng-show add-car form

        if ($scope.arr.length <= 0) {
          // get mpg records from records object in db
          angular.forEach($scope.user.details.record, function(mpg, index) {
            $scope.arr.push({mpg: mpg.mpg, model: mpg.car}); // push it to the $scope.arr array
          });
        }

        console.log($scope.arr);
      }).then(function() {
          getAvg();
          console.log($scope.miles);
          $scope.setCar();
      });
    }

    function getAvg() {
      //console.log($scope.user.details.car);
      // get car model names

      // data prep
      // iterate over car items
      for (var i = 0; i < $scope.user.details.car.length; i++) {
        // create new object with model name, miles
        var obj = {
          name: $scope.user.details.car[i].model,
          mpg: [], // need to pass this into an array to get the length
          total: 0,
          avg: 0
        };
        // iterate through the $scope.arr items
        for (j = 0; j < $scope.arr.length; j++) {
          if (obj.name == $scope.arr[j].model) {
            obj.mpg.push($scope.arr[j].mpg); // push item into local object array
          }
        }

        // iterate over the obj.miles array to set the obj.total value
        for (var k = 0; k < obj.mpg.length; k++) {
          obj.total += obj.mpg[k];
        }

        // set avg value, total / length
        obj.avg = (obj.total/obj.mpg.length).toFixed(2);

        $scope.miles.push(obj); // push object to array
        $scope.user.details.car[i].avg = obj.avg;
      }
    }

    // send link car model up to rootScope
    $scope.setCar = function(car, avg) {
      //console.log(car);
      $scope.$emit('handleEmit', {car: car});
      $scope.$emit('carAvgEmit', {avg: avg});
    };

    // add a new car to userProfile
    $scope.addNewCar = function() {
      console.log($scope.add_model);
      console.log($scope.add_brand);
      console.log($scope.add_year);

      Car.addCar({
        model: $scope.add_model,
        brand: $scope.add_brand,
        year: $scope.add_year,
        email: $scope.user.local.email
      }).then(function() {
        getData(); // update contents on page

        $scope.add_model = ''; // clear add_model
        $scope.add_brand = ''; // clear add_brand
        $scope.add_year = ''; // clear add_year
      });
    };

    $scope.removeCar = function(car_id) {
      console.log(car_id);
      console.log($scope.user.local.email);

      Car.removeCar({
        email: $scope.user.local.email,
        id: car_id
      }).then(function() {
        getData();
      });
    };

    // show the add car form
    $scope.showCarForm = function() {
      if (!$scope.show_car_form) {
        $scope.show_car_form = true;
      }
      else if ($scope.show_car_form) {
        $scope.show_car_form = false;
      }
      else {
        $log.log("Something wrong with show car form switcher");
      }
    };

    getData();
  }]);
