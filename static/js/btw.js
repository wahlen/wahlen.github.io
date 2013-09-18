// https://milkator.wordpress.com/2013/02/25/making-a-map-of-germany-with-topojson/
// https://github.com/pudo/btw13.js

var width = 675,
    height = 900;

var path = d3.geo.path();

var svg = d3.select('#main').append('svg')
    .attr('width', width)
    .attr('height', height);

queue()
    .defer(d3.json, '/data/DEU.topo.json')
    .defer(d3.csv, '/data/bundestagswahl_2009.csv')
    .await(showData);

function showData(error, de, btw) {
    console.log(de, btw)
    var subunits = topojson.object(de, de.objects.subunits);

    var projection = d3.geo.mercator()
        .center([10.5, 51.35])
        .scale(3800)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection)
        .pointRadius(4);

    svg.append('path')
        .datum(subunits)
        .attr('d', path)

    svg.selectAll('.subunit')
        .data(topojson.object(de, de.objects.subunits).geometries)
      .enter().append('path')
        .attr('class', function(d) { return 'subunit ' + d.properties.name; })
        .attr('d', path)
        .on('click', click);

    function click(a){
        console.log(a.properties.name);}

    svg.append('path')
        .datum(topojson.mesh(de, de.objects.subunits, function(a,b) { if (a!==b || a.properties.name === 'Berlin'|| a.properties.name === 'Bremen'){var ret = a;}return ret;}))
        .attr('d', path)
        .attr('class', 'subunit-boundary');

    svg.selectAll('.subunit-label')
        .data(topojson.object(de, de.objects.subunits).geometries)
      .enter().append('text')
        .attr('class', function(d) { return 'subunit-label ' + d.properties.name; })
        .attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
        .attr('dy', function(d){
//console.log(d.properties)
            if(d.properties.name==='Brandenburg') {
                return '2em'
            }
            if(d.properties.name==='Sachsen-Anhalt' || d.properties.name==='Rheinland-Pfalz' || d.properties.name==='Bremen') {
                return '1em'
            }
            return '.35em';
        })
        .text(function(d) { return d.properties.name; });
}