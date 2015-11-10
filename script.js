// LOCAL STORAGE HANDLING
function timeStamp() {
  var date = new Date();
  var today = date.toDateString();
  return { date: today };
}


// create a user constructor to build
var User = function( name ) {
  this.name = name;
  // user dates history
  this.dateHistory = [];

  // user mpg history
  this.mpgHistory = [];
  // dateHistory is the get function to retrieve localStorage values for dates prop
  this.getDateHistory = function() {
    // declare a variable to parse out the local storage properties
    var data = JSON.parse( localStorage.dates );
    // return data object
    return { data : data };
  };

  // mpgHistory is the get function to retrieve localStorage values for mpg prop
  this.getMpgHistory = function() {
    // declare a variable to parse out the local storage properties
    var data = JSON.parse( localStorage.mpg );
    // return data object
    return { data : data };
  };
};

var user = new User();


var Car = function( name ) {
  // set the name of the car
  this.name = name;
  // create an object literal to store the return value of the getMpg computation
  this.mpg = {};
  // getMpg takes two numbers as arguments to return the mpg for the car.
  this.getMpg = function( miles, gallons ) {
    var mpg = miles/ gallons;
    // set object value
    this.mpg = parseFloat( mpg.toFixed(3));
  };
};

var car = new Car();

// callback function that processes the input values as provided by user
// into local storage
// needs to be invoked for each instance of local storage assignment, eg. mpg and date
// Arguments:
// arr - array to populate, default state on page load of array is empty
// prop - string name to set local storage key
// val - value to be assigned to the local storage key (or prop, as it is designated above)
function setLocalStorage( arr, prop, val ) {
  // pushing value to outside of functional scope will allow for adding new entries into localStorage string
  arr.push( val );
  // push the values into the local storage values as JSON data
  localStorage[prop] = JSON.stringify( arr );
}

// This function processes the input value passed in by the user
function getVal( input ) {
  var val = input.value;

  if ( typeof val === "string" ) {
    var toNum = parseInt( val );
    // check value of toNum to make sure it's a valid value
    if ( isNaN( toNum ) ) {
      // log an error for the time being
      console.log("something went wrong");
    }
    else {
      // return number
      return toNum;
    }
  }
}

function processValues() {
  var miles = document.getElementById("miles");
  var gallons = document.getElementById("gallons");
  var mi = getVal( miles ); // get mileage input value
  var g = getVal( gallons ); // get gallons input value
  car.getMpg( mi, g );
  console.log( car.mpg );
  return car.mpg;
}
