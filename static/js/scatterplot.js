var myCircle;
var xScale;
var yScale;
function scatterPlot(data) {

    d3.select('body').select('#svg4').remove()
    var divWidth = document.getElementById('scatterplot').clientWidth;
    // var divHeight = document.getElementById('scatterplot').clientHeight;
    var margin = {top: 50, right: 5, bottom: 50, left: 40},
    // width = 260 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom
    width = divWidth - margin.left - margin.right;
    // var height = divHeight - margin.top - margin.bottom;

    var svg = d3.select("#scatterplot").append("svg").attr('id', 'svg4')
    .attr("width", width + margin.left + margin.right)
    // .attr("width", divWidth)
    .attr("height", height + margin.top + margin.bottom)
    // .attr("transform", "translate("+(5)+","+"0"+")")
    // .append("g")
    // .attr("transform","translate(" + margin.left + "," + margin.top + ")");
        
        var xaxis = data.map(function(d) 
        {return d['TotalWorkers'] })
        var yaxis = data.map(function(d) { return d['MaxCap']} )
        // console.log(xaxis)
        // console.log(yaxis)
        var dataset1 = xaxis.map(function(e, i) {
            return [e, yaxis[i]];
          });
        // console.log(dataset1)
        xScale = d3.scaleLinear()
        .domain([0, d3.max(xaxis)])
        .range([0, width]);

        yScale = d3.scaleLinear()
    .domain([0, d3.max(yaxis)])
    .range([height, 0]);

    // // Title
    // svg.append('text')
    // .attr('x', width/2)
    // .attr('y', 0)
    // .attr('text-anchor', 'middle')
    // .style('font-family', 'Helvetica')
    // .style('font-size', 20)
    // .text('Scatter Plot');

    // X label
    svg.append('text')
    .attr('x', (width+100)/2)
    .attr('y', height+80)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Total Educational Workers');

    // Title
    svg.append('text')
    .attr('x', (width/2)+15)
    .attr('y', 10)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Max. Capacity vs Total Workers');

    // Y label
    svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(10,' + (height-30) + ')rotate(-90)')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Maximum Child Capacity');

    svg.append("g")
        .attr("transform", "translate(40," + (height+40) + ")")
        .call(d3.axisBottom(xScale));
            
    svg.append("g")
        .attr("transform", "translate(40," + 40 + ")")
        .call(d3.axisLeft(yScale));

    //for tooltip
    var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

    // Step 7
    myCircle = svg.append('g')
    .selectAll("dot")
    .data(dataset1)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d[0]); } )
    .attr("cy", function (d) { return yScale(d[1]); } )
    .attr("r", 3)
    .attr("transform", "translate(" + 40 + "," + 40 + ")")
    .style("fill", "purple")
    .style("opacity", 0.5)
  //   .on("click", function(d) {      
  //     div.transition()        
  //         .duration(200)      
  //         .style("opacity", .9);      
  //     div .html('hello')  
  //         .style("left", (d3.event.pageX) + "px")     
  //         .style("top", (d3.event.pageY - 28) + "px");    
  //     })                  
  // .on("mouseout", function(d) {       
  //     div.transition()        
  //         .duration(500)      
  //         .style("opacity", 0);   
  // });

    // Add brushing
  svg.append('g')
  .call( d3.brush()  // Add the brush feature using the d3.brush function
    .extent( [ [40,40], [width+40,height+40] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    .on("end", filterViaScatter)
     // Each time the brush selection changes, trigger the 'updateChart' function
  )
    
}
