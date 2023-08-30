function pcp_plot(data_for_pcp) {
    d3.select('body').select('#svg5').remove()
    var pcp_data = data_for_pcp.map(function(d) {
        return {"Borough":d.Borough, "MaxCap":d.MaxCap,'Years':d.Years, 
        'Violation%':d['Violation%'], 'TotalWorkers':d['TotalWorkers'],
        'PHHViolation%':d['PHHViolation%'],
        'CriticalViolation%':d['CriticalViolation%']}
    })
    // console.log(pcp_data)

    const svgWidth = 375,
    svgHeight = 250,
    margin = 10,
    width = svgWidth - margin,
    height = svgHeight - margin;
    
    var color = {'BROOKLYN':'red', 'MANHATTAN':'gray', 
    'QUEENS':'#2C3539', 'BRONX':'black','STATEN ISLAND':'orange'}

    var x,
        y = {},
        dimensions,
        dragging = {},
        background,
        foreground;

    var svg = d3.select("#PCP").append("svg").attr("id","svg5").attr("class", "pcp")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 20 + ")");

    // Title
    svg.append('text')
    .attr('x', width/2)
    .attr('y', -10)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('PCP');

    // getting the columns and create the y axis
    columns = Object.keys(pcp_data[0])
    dimensions = columns.filter(function (key) {
        if(key=="Borough") {}
        else {
            y[key] = d3.scaleLinear()
            .domain(d3.extent(pcp_data, function (d) { return +d[key]; }))
            .range([height-20, 10]);
            return key;
        }
    });
    // console.log(dimensions)

    x = d3.scalePoint()
        .domain(dimensions)
        .range([30, width-25]);

    // adding the axis lines to show the mapping
    background = svg.append("g")
        .attr("class", "background")
        .selectAll("path")
        .data(pcp_data)
        .enter().append("path")
        .attr("d", line)

    // creating the path between the attributes
    foreground = svg.append("g")
        .attr("class", "foreground")
        .selectAll("path")
        .data(pcp_data)
        .enter().append("path")
        .attr("d", line)
        .style("stroke", function(d) { return color[d['Borough']] } )
        .style("fill", "none")
        .style("opacity", 0.8)

    var g = svg.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function (d) { return "translate(" + x(d) + ")"; })
        .call(d3.drag()
            .on("start", function (d) {
                dragging[d] = x(d);
                background.attr("visibility", "hidden");
            })
            .on("drag", function (d) {
                dragging[d] = Math.min(width, Math.max(0, d3.event.x));
                foreground.attr("d", line);
                dimensions.sort(function (a, b) { return position(a) - position(b); });
                x.domain(dimensions);
                g.attr("transform", function (d) { return "translate(" + position(d) + ")"; })
            })
            .on("end", function (d) {
                delete dragging[d];
                transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
                transition(foreground).attr("d", line);
                background
                    .attr("d", line)
                    .transition()
                    .delay(500)
                    .duration(0)
                    .attr("visibility", null);
            }));

    g.append("g")
        .attr("class", "PCPaxis")
        .each(function (d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
        .append("text")
        .style("text-anchor", "middle")
        .attr("font-size", "8")
        .attr("y", 7)
        .text(function (d) { return d; })
        .attr("fill", "black");

    g.append("g")
        .attr("class", "brush")
        .each(function (d) {
            d3.select(this).call(y[d].brush = d3.brushY()
                .extent([[-10, 0], [10, height]])
                .on("start", brushstart)
                .on("brush", brush)
                .on("end", brush));
        })
        .selectAll("rect")
        .attr("x", -8)
        .attr("width", 16);
    function position(d) {
        var v = dragging[d];
        return v == null ? x(d) : v;
    }

    function transition(g) {
        return g.transition().duration(500);
    }

    function line(d) {
        return d3.line()(dimensions.map(function (key) { return [x(key), y[key](d[key])]; }));
    }

    function brushstart() {
        d3.event.sourceEvent.stopPropagation();
    }

    function brush() {
        var actives = [];
        svg.selectAll(".brush")
            .filter(function (d) {
                //console.log(d3.brushSelection(this));
                return d3.brushSelection(this);
            })
            .each(function (key) {
                actives.push({
                    dimension: key,
                    extent: d3.brushSelection(this)
                });
            });
        if (actives.length === 0) {
            foreground.style("display", null);
        } else {
            foreground.style("display", function (d) {
                return actives.every(function (brushObj) {
                    return brushObj.extent[0] <= y[brushObj.dimension](d[brushObj.dimension]) && y[brushObj.dimension](d[brushObj.dimension]) <= brushObj.extent[1];
                }) ? null : "none";
            });
        }
    }
}
