angular.module('roots.directives.angles', ['roots.services', 'roots.controllers'])
  .directive('angles', ['d3Service', 'input', 'sol', function(d3Service, input, sol) {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
          //graph width
          var SIZE = 300;

          var svg = d3.select(element[0])
            .append('svg')
              .style("class", 'complex-graph')
              .attr("width", SIZE)
              .attr("height", SIZE);

          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          scope.render = function(data) {
            // remove all previous items before render
            svg.selectAll('*').remove();

            // If we don't pass any data, return out of the element
            if (!data) return;

            var graph = svg
                .append("g")
                .attr("class", "graph");

            var unitCircle = graph
                .append("circle")
                .attr("class", "unit-circle")
                .attr("cx", SIZE/2)
                .attr("cy", SIZE/2)
                .attr("r", SIZE*4/10)
                .style("fill", "#770000")
                .on("click", turnNeedle);

            var realVertex = graph
                .append("line")
                .attr("x1", 0)
                .attr("y1", SIZE/2)
                .attr("x2", SIZE)
                .attr("y2", SIZE/2)
                .attr("stroke", "black")
                .attr("stroke-width", 1);

            var imaginaryVertex = graph
                .append("line")
                .attr("x1", SIZE/2)
                .attr("y1", 0)
                .attr("x2", SIZE/2)
                .attr("y2", SIZE)
                .attr("stroke", "black")
                .attr("stroke-width", 1);

            var needle = svg.selectAll("g").data(data).enter()
                .append("g")
                .attr("class", "needle")
                .attr("transform", "translate( 0 , 0 )")
                .append("path")
                .attr("class", "tri")
                .attr("d", "M" + (SIZE/2 - 3) + " " + SIZE/2 + " L" + SIZE/2 + " " + (SIZE/2 -3) + " L" + SIZE*7/8 + " " + SIZE/2 + " L" + SIZE/2 + " " + (SIZE/2 +3) + " Z")
                .attr("transform", function(d,i) {
                  return "rotate(" + (d.start*180/Math.PI) +", " + SIZE/2 + "," + SIZE/2 + ")";
                });

            function turnNeedle(){
                needle
                    .transition()
                    .duration(2000)
                    .attrTween("transform", tween);
                function tween(d, i, a) {
                  return d3.interpolateString("rotate("+(d.start*180/Math.PI)  +", " + SIZE/2 + ", " + SIZE/2 + ")", "rotate("+ (d.phi*180/Math.PI) + ", " + SIZE/2 + ", " + SIZE/2 + ")");
                }
            };
          };

        });
      }
    };
  }]);