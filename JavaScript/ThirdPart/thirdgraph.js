var margin = { top: 20, right: 10, bottom: 400, left: 100 },
    width = 1000 - margin.right - margin.left,
    height = 700 - margin.top - margin.bottom;

// svg element

var svg = d3.select('body')
    .append('svg')
    .attr({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
    })

.append('g')
    .attr("transform", "translate(" + margin.left + ',' + margin.right + ')');


///define x axis and y axis scale

var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.2, 0.2);

var yScale = d3.scale.linear()
    .range([height, 0]); //so that bar grows up

//define xaxis

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

//define yaxis

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");




//import json data
d3.json('graph3.json', function(error, data) {
    if (error)
        console.log("Error found");
    data.forEach(function(d) {
        d["Value"] = +d["Value"];
        d["type"] = d["type"];
       // console.log(d["Age-group"] + '::' + d["Literate - Persons"]);
    });

   

    xScale.domain(data.map(function(d) {
        return d["type"] }));
    yScale.domain([0, d3.max(data, function(d) {
        return d["Value"]; })])

    //draw bars
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr({
            'x': function(d) {
                return xScale(d["type"]); },
            'y': function(d) {
                return yScale(d["Value"]); },
            'width': xScale.rangeBand(),
            'height': function(d) {
                return height - yScale(d["Value"]); }
        });


        
    //draw the X axis
    svg.append('g')
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll('text')
        .attr("transform", "rotate(-60)")
        .attr("dx", "-.8em")
        .attr("dy", "-.25em")
        .style("text-anchor", "end")
        .style("font-size", "10px");

    svg.append('g')
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll('text')
        .style("font-size", "14px");

});
