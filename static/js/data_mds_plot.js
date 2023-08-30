function scatter_mds_data(data) {

    d3.select('body').select('#svg7').remove()
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

        
    var xScale = d3.scaleLinear()
        .domain(d3.extent(data.map(a => a['X'])))
        .range([20, width]);

    var yScale = d3.scaleLinear()
    .domain(d3.extent(data.map(a => a['Y'])))
    .range([height-20, 10]);

    // var g = svg.append("g")
    //             .attr("transform", "translate(" + 10 + "," + 10 + ")");

    var mds_num_data = []
    data.forEach(function(d) {
        obj = {}
        obj['Borough'] = d['Borough']
        obj['Legal Name'] = d['Legal Name']
        obj['X'] = d['X']
        obj['Y'] = d['Y']
        mds_num_data.push(obj)
    })

    // Title
    svg.append('text')
    .attr('x', width/2)
    .attr('y', 3)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('MDS Plot');

    // X label
    svg.append('text')
    .attr('x', width/2)
    .attr('y', height+3)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 10)
    .text('X-axis');

    // Y label
    svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(2,' + height/2 + ')rotate(-90)')
    .style('font-family', 'Helvetica')
    .style('font-size', 10)
    .text('Y-axis');

    svg.append("g")
        .attr("transform", "translate(0," + (height-20) + ")")
        .style("font-size", "8px")
        .call(d3.axisBottom(xScale));
            
    svg.append("g")
        .attr("transform", "translate(20," + 0 + ")")
        .style("font-size", "8px")
        .call(d3.axisLeft(yScale));

    var color = {'BROOKLYN':'red', 'MANHATTAN':'gray', 
    'QUEENS':'#2C3539', 'BRONX':'black','STATEN ISLAND':'orange'}
    // console.log(d3.schemeCategory10)

    //for tooltip
    var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

    svg.append('g')
    .selectAll("dot")
    .data(mds_num_data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d['X']); } )
    .attr("cy", function (d) { return yScale(d['Y']); } )
    .attr("r", 3)
    .style("fill", function(d) { return color[d['Borough']]})
    // .style("fill", "#046307")
    .style("opacity", 0.8)
    .on("click", function(d) {      
    div.transition()        
        .duration(200)      
        .style("opacity", .9);      
    div .html(d['Legal Name'])  
        .style("left", (d3.event.pageX-150) + "px")
        // .style("left", 0 + "px")       
        .style("top", (d3.event.pageY - 28) + "px");    
    })
    .on("mouseover", mouseover)
    .on("mouseleave", mouseleave)                  
  .on("mouseout", function(d) {       
      div.transition()        
          .duration(500)      
          .style("opacity", 0);   
  });

    var legend = svg.selectAll(".legend")
      .data(Object.keys(color))
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + (i) * 10 + ")"; });

  legend.append("rect")
      .attr("x", width-55)
      .attr("y", 10)
      .attr("width", 8)
      .attr("height", 8)
      .style("fill", function(d) { return color[d]})
      .style("opacity", 0.8);

  legend.append("text")
      .attr("x", width-45)
      .attr("y", 14)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .style('font-size', 6)
      .text(function(d) { return d; });

}


