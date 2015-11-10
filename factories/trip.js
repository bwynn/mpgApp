angular.module("mpgApp")
.factory("Trip", function() {
  // create a Trip constructor object to instantiate with each visit to create a new record
  var Trip = function( cars, mpg, dates ) {
    this.cars = cars;
    this.mpg = mpg;
    this.dates = dates;
  };

  return Trip;
});
