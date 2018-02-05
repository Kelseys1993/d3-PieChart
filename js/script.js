var data;

d3.json('js/mock.json', function(error, jsonData){
	if(error){
		console.log('something has gone wrong');
		return;
	}

	data = jsonData;


var svg = d3.select('svg'),
	width = +svg.attr('width'),
	height = +svg.attr('height'),
	styles = +svg.style('background-color', 'lightgrey')
	radius = Math.min(width, height) /2,
	g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
	
var color = d3.scaleOrdinal(['#00E5EE', '#DC143C', '#008000', 
	'#FF0000', '#800080', '#0000FF', '#FD3F92', '#FF7F50', '#ACE1AF', '#800020']);

var pie = d3.pie()
	.sort(null)
	.value(function(d){
		return d.Number;
	});

var path = d3.arc()
	.outerRadius(radius - 10)
	.innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var arc = g.selectAll('arc')
	.data(pie(data))
	.enter().append('g')
		.attr('class', 'arc');

arc.append('path')
	.attr('d', path)
	.attr('fill', function(d){
		return color(d.data.Colour);
	});


  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.Number; });
});





