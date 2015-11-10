angular.module("mpgApp")
.filter("reverse", function() {
  return function(trips) {
    return trips.slice().reverse();
  }
});
