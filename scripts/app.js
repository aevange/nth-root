var app = angular.module('roots', ['roots.services', 'roots.directives']);

app.controller('MainCtrl', ['$scope', 'input', 'sol', function($scope, input, sol) {

  $scope.polar = {};
  $scope.polar.r = Math.sqrt(Math.pow(input.r,2) + Math.pow(input.i,2));
  $scope.rootR = 0;
  $scope.solutions = [];


  $scope.calculate = function() {
    var results = [{phi: 90}];
    $scope.magnitude = [];
    input.r = $scope.realPart;
    input.i = $scope.imaginaryPart;
    input.d = $scope.nthDegree;
    //original magnitue
    var oMag = Math.sqrt(Math.pow(input.r,2) + Math.pow(input.i,2));
    //root magnitude
    var rMag = Math.pow(oMag, 1/input.d);
    $scope.magnitude.push({name: 'original', len: oMag});
    $scope.magnitude.push({name: 'root', len: rMag});
    // console.log($scope.magnitude);

    //TODO: the below returns radians - check to see what d3 needs
    var phi1 = Math.atan2(-input.i, input.r);
    $scope.polar.phi = phi1;
    for(var i = 0; i < input.d; i++){
      var rad = phi1 + 2*Math.PI*i;
      var phi = rad/input.d;

      var solu = {
          'start': phi1,///(i+1),
          'phi': phi,
          // 'name': i
        }
      results.push(solu);
    }
    // console.log(results);
    $scope.solutions = results;
    sol.utions = $scope.solutions;
    // console.log('solutions', $scope.solutions);
  };

}]);