angular.module('roots.controllers', [])
  .controller('MainCtrl', ['$scope', 'input', 'sol', function($scope, input, sol) {

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
      var oMag = Math.sqrt(Math.pow(input.r,2) + Math.pow(input.i,2));
      var rMag = Math.pow(oMag, 1/input.d);
      $scope.magnitude.push({name: 'original', len: oMag});
      $scope.magnitude.push({name: 'root', len: rMag});

      var phi1 = Math.atan2(-input.i, input.r);
      //to avoid having to make over a full rotation we need to start with a positive
      if(phi1 < 0){
        phi1 += 2*Math.PI;
      }
      $scope.polar.phi = phi1;
      for(var i = 0; i < input.d; i++){
        var rad = phi1 + 2*Math.PI*i;

        var phi = rad/input.d;

        var solution = {
            'start': phi1,
            'phi': phi
          }
        results.push(solution);
      }
      $scope.solutions = results;
      sol.utions = $scope.solutions;
    };

  }]);