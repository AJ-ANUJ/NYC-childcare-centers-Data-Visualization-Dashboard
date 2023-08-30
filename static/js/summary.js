function summaryBarGraph(data) {

    d3.select('body').select('#svg7').remove()
    // set the dimensions and margins of the graph
    var divWidth = document.getElementById('Summary').clientWidth;
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = divWidth - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#Summary")
    .append("svg")
    .attr("id", "svg7")
    .attr("width", divWidth)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // X label
    svg.append('text')
        // .attr('x', width/2 + 100)
        // .attr('y', height + 150)
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate('+(width/2)+',' + (height+5) + ')')
        .style('font-family', 'Helvetica')
        .style('font-size', 10)
        .text("count");

    // Y label
    svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(-2.5,' + (height/2) + ')rotate(-90)')
    .style('font-family', 'Helvetica')
    .style('font-size', 10)
    .text("Summary");

    var col = data.map(function(a) {return a['Inspection Summary Result'];});
    var countObj = {};
    col.forEach(function(d) {
        var val = d;
        if(countObj[val] === undefined) {
            countObj[val] = 1;
        } else {
            countObj[val] = countObj[val] + 1;
        }
    });
    //console.log(countObj);
    var arr = Object.entries(countObj);
    // Scale the range of the data in the domains
    //x.domain(Object.keys(countObj));
    //y.domain([0, d3.max(Object.values(countObj))]);
// Add X axis
var x = d3.scaleLinear()
.domain([0, d3.max(Object.values(countObj))])
.range([5, width]);

svg.append("g")
.attr("transform", "translate(0," + (height-18) + ")")
.style("font-size", "8px")
.call(d3.axisBottom(x))
// .selectAll("text")
//   .attr("transform", "translate(-10,0)rotate(-45)")
//   .style("text-anchor", "end");

// Y axis
var y = d3.scaleBand()
.range([10, height-18])
.domain(Object.keys(countObj))
.padding(.1);
svg.append("g")
.attr("transform", "translate(5," + 0 + ")")
// .style('stroke', '#100')
.call(d3.axisLeft(y))
.selectAll("text")
  .attr("transform", "translate(12,0)")
  .style("text-anchor", "start");


//Bars
svg.selectAll("bar")
.data(arr)
.enter()
.append("rect")
.attr("x", function(d) { return x(0); })
.attr("y", function(d) { return y(d[0]); })
.attr("width", function(d) { return x(d[1]); })
.attr("height", y.bandwidth() )
.attr("fill", "#C25283")
.style("opacity", 0.5)

// d3.select('body')
//     .select('svg')
//     .append("text")
//     .attr("transform", "translate(480,0)")
//     .attr("x", 50)
//     .attr("y", 50)
//     .attr("font-size", "24px")
//     .text("Bar Graph");

};