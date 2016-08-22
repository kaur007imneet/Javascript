var margin = { top: 20, right: 10, bottom: 100, left: 100 },
    width = 700 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

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
d3.json('graph1.json', function(error, data) {
    if (error)
        console.log("Error found");
    data.forEach(function(d) {
        d["Literate - Persons"] = +d["Literate - Persons"];
        d["Age-group"] = d["Age-group"];
        console.log(d["Age-group"] + '::' + d["Literate - Persons"]);
    });

   

    xScale.domain(data.map(function(d) {
        return d["Age-group"] }));
    yScale.domain([0, d3.max(data, function(d) {
        return d["Literate - Persons"]; })])

    //draw bars
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr({
            'x': function(d) {
                return xScale(d["Age-group"]); },
            'y': function(d) {
                return yScale(d["Literate - Persons"]); },
            'width': xScale.rangeBand(),
            'height': function(d) {
                return height - yScale(d["Literate - Persons"]); }
        });


    //draw the X axis
    svg.append('g')
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll('text')
        .attr("transform", "rotate(-60)")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .style("text-anchor", "end")
        .style("font-size", "14px");


        /*svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(function(d){
            return d.Literate - Persons;})
        .attr('x',function(d){
            return xScale(d.Age-group)+xScale.rangeBand()/2;})
        .attr('y',function(d){
            return yScale(d.Literate - Persons)+12;})
    
        .style("fill","white")
        .style("text-anchor","middle");*/
        

    // //label rhe bars
    // svg.selectAll('text')
    //     .data(data)
    //     .enter()
    //     .append('text')
    //     .text(funct)

    //draw the y Axis
    svg.append('g')
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll('text')
        .style("font-size", "14px");

});
