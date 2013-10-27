angular.module('roots.directives.barChart', ['roots.services'])
  .directive('barChart', ['d3Service', 'input', 'sol', function(d3Service, input, sol) {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

          var margin = parseInt(attrs.margin) || 20,
          barHeight = parseInt(attrs.barHeight) || 20,
          barPadding = parseInt(attrs.barPadding) || 5;

          var svg = d3.select(element[0])
            .append('svg')
            .style('class', 'bar-graph')
            .style('width', '90%')
            .style('height', 50);

          // Browser onresize event
          window.onresize = function() {
            scope.$apply();
          };

          // Watch for resize event
          scope.$watch(function() {
            return angular.element(window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });

          scope.$watch('data', function(newVals, oldVals) {

            return scope.render(newVals);
          }, true);

          scope.render = function(data) {
            // remove all previous items before render
            svg.selectAll('*').remove();
            // If we don't pass any data, return out of the element
            if (!data) return;

            // setup variables
            var width = d3.select(element[0]).node().offsetWidth - margin,
                // calculate the height
                height = scope.data.length * (barHeight + barPadding),
                // Use the category20() scale function for multicolor support
                color = d3.scale.category20(),
                // our xScale
                xScale = d3.scale.linear()
                  .domain([0, d3.max(data, function(d) {
                    return d.len;
                  })])
                  .range([0, width]);

            // set the height based on the calculations above
            svg.attr('height', height);

            //create the rectangles for the bar chart
            svg.selectAll('rect')
              .data(data).enter()
                .append('rect')
                .attr('height', barHeight)
                .attr('width', 140)
                .attr('x', 0)
                .attr('y', function(d,i) {
                  return i * (barHeight + barPadding);
                })
                .attr('fill', function(d) { return color(d.len); })
                .transition()
                  .duration(1000)
                  .attr('width', function(d) {
                    return xScale(d.len);
                  });
          };
        });
      }};
  }]);