function histo(data) {
    d3.select('body').select('#svg6').remove()

    // set the dimensions and margins of the graph
    var divWidth = document.getElementById('histogram').clientWidth;
    var margin = {top: 0, right: 10, bottom: 50, left: 100},
    width = divWidth,
    height = 250 - margin.top - margin.bottom;
    // const svgWidth = 260,
    // svgHeight = 250,
    // margin = 10,
    // width = svgWidth - margin,
    // height = svgHeight - margin;

    // append the svg object to the body of the page
    var svg = d3.select("#histogram")
    .append("svg").attr("id", "svg6")
    .attr("width", divWidth)
    .attr("height", height+margin.top+margin.bottom)
    // .append("g")
    // .attr("transform",
    //         "translate(" + margin.left + "," + margin.top + ")");

    // X label
    svg.append('text')
        // .attr('x', width/2 + 100)
        // .attr('y', height + 150)
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate('+(width/2)+',' + (height+45) + ')')
        .style('font-family', 'Helvetica')
        .style('font-size', 10)
        .text("Years in operation");

    // Title
    svg.append('text')
        // .attr('x', width/2 + 100)
        // .attr('y', height + 150)
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate('+(width/2)+',' + (12) + ')')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text("Distribution of Childcare Centers by Years of Operations");

    // Y label
    svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(20,' + (height/2) + ')rotate(-90)')
    .style('font-family', 'Helvetica')
    .style('font-size', 10)
    .text("count");

    // X axis: scale and draw:
    var x = d3.scaleLinear()
        .domain([0, (d3.max(data, function(d) 
            {return +d['Years']}))+5])
        // .domain([0,80])
        .range([60, width-10]);
    svg.append("g")
        .attr("transform", "translate(0," + (height+20) + ")")
        .style("font-size", "8px")
        .call(d3.axisBottom(x));
  
    // set the parameters for the histogram
    var histogram = d3.histogram()
        .value(function(d) { return d['Years']; })   // vector of value
        .domain(x.domain())  // domain of the graphic
        .thresholds(x.ticks(25));
        // .thresholds(x.ticks(50)); //numbers of bins
  
    // And apply this function to data to get the bins
    var bins = histogram(data);
    //console.log(bins);    
    // Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range([height+20, 30]);
        y.domain([0, d3.max(bins, function(d) { return d.length; })]);
    svg.append("g")
        .attr("transform", "translate(60," + 0 + ")")
        .call(d3.axisLeft(y));
  
    // append the bar rectangles to the svg element
    var sum = 0
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
          //.attr("x", 1)
          .attr("transform", function(d) {console.log(d)
            return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .attr("width", function(d) { 
            return x(d.x1) - x(d.x0)-1
            //   if(x(d.x1)==x(d.x0)) {
            //       return x(80)-x(78)-1}
            //     else {return x(d.x1) - x(d.x0)-1 ; }
        })
          .attr("height", function(d) { return (height+20) - y(d.length); })
          .style("fill", "#CD7F32")
          .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)
    svg.selectAll("rect").on("click", function(d) {
    if((d3.select(this).style('fill'))=="rgb(205, 127, 50)") {
        d3.select(this).style("fill", "#254117"); //rgb(150, 200, 220)
        console.log(d)
        // stat[0] = Math.max(...stat)+1
        filterViaHist(d,"add")
    }
    else {d3.select(this).style("fill", "rgb(205, 127, 50)");
    // stat[0] = Math.max(...stat)+1
    filterViaHist(d,"remove")
    }
});
    //console.log(sum)
    // d3.select('body')
    // .select('svg')
    // .append("text")
    // .attr("transform", "translate(480,0)")
    // .attr("x", 50)
    // .attr("y", 50)
    // .attr("font-size", "24px")
    // .text("Histogram");
    
};