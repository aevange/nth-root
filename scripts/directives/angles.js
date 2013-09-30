angular.module('roots.directives', ['roots.services'])
  .directive('angles', ['d3Service', 'input', 'sol', function(d3Service, input, sol) {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

          var svg = d3.select(element[0])
          // var svg = d3.select('.angles')
            .append('svg')
              .attr("width", 300)
              .attr("height", 300);

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
                .attr("class", "arc");

            var gauge = plot
                .append("path")
                .attr("d", arc)
                .attr("class", "gauge")
                .style("fill", "#ddd")
                .attr("transform", "translate(150,130) ")
                // .attr("transform", "translate(150,130) rotate(180)")
                .on("click", turnNeedle);

            var needle = svg.selectAll("g").data(data).enter()
                .append("g")
                .attr("class", "needle")
                .attr("transform", "translate( 0 , 0 )")
                .append("path")
                .attr("class", "tri")
                .attr("d", "M" + (300/2 + 3) + " " + (120 + 10) + " L" + 300/2 + " 0 L" + (300/2 - 3) + " " + (120 + 10) + " C" + (300/2 - 3) + " " + (120 + 20) + " " + (300/2 + 3) + " " + (120 + 20) + " " + (300/2 + 3) + " " + (120 + 10) + " Z")
                .attr("transform", function(d,i) {
                  return "rotate(" + (d.start*180/Math.PI+90) +", " + 300/2 + "," + (120 + 10) + ")";
                });

            function turnNeedle(){
                needle
                    .transition()
                    .duration(2000)
                    .attrTween("transform", tween);
                function tween(d, i, a) {
                  return d3.interpolateString("rotate("+(d.start*180/Math.PI+90)  +", 150, 130)", "rotate("+ (-d.phi*180/Math.PI+90) + ", 150, 130)");
                }
            };
          };

        });
      }
    };
  }]);