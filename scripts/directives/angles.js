angular.module('roots.directives.angles', ['roots.services'])
  .directive('angles', ['d3Service', 'input', 'sol', function(d3Service, input, sol) {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
          //graph width
          var SIZE = 300

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

            var arc = d3.svg.arc()
                .innerRadius(0)
                .outerRadius(120)
                .startAngle(89 * (Math.PI/180))
                .endAngle(-269 * (Math.PI/180));

            var plot = svg
                .append("g")
                .attr("class", "plot");

            var gauge = plot
                .append("path")
                .attr("d", arc)
                .attr("class", "unit-circle")
                .style("fill", "#770000")
                .attr("transform", "translate(" + SIZE/2 + "," + SIZE/2 + ") ")
                .on("click", turnNeedle);

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