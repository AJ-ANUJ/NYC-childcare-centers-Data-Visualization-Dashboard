//variable for the whole dataset
var data = []
// var pcp_data = []

//reading in data for the bar chart
async function plot1_data() {
    let url1 = "http://127.0.0.1:5004/plot1_data"
    // let url2 = "http://127.0.0.1:5002/pcp_plot"    
    let initial_data = await fetch(url1)
    data = await initial_data.json()
    // pcp_data = await (await fetch(url2)).json()

};


//function to call the plot1_data and plot1_barGraph functions
async function temp_for_plot1() {
    await plot1_data()
    //console.log(data)
    plot1_barGraph(data)
    plot2_pieChart(data) 
    plot3_pieChart(data)
    scatterPlot(data)
    histo(data)
    pcp_plot(data)
    // summaryBarGraph(data)
    scatter_mds_data(data)
    
}

temp_for_plot1()

function plot1_barGraph(data_for_plot1) {

    // d3.select('body').selectAll('svg').remove()
    // d3.select('body').select('#tablediv').remove()
    // d3.select('body').select('#scattermatrix').remove()
    // d3.select('body').select('#elbow').remove()
    // d3.select('body').select('#para').remove()
    // d3.select('body').select('#head').remove()
    d3.select('body').select('#svg1').remove()

    //console.log(str, data);
    //set the dimensions and margins of the graph
    var divWidth = document.getElementById('barplot').clientWidth;
    console.log(divWidth)
    var margin = {top: 50, right: 5, bottom: 50, left: 60},
    width = divWidth - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);
        
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#barplot").append("svg").attr('id', 'svg1')
    // .attr("width", width + margin.left + margin.right)
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
        .attr('transform', 'translate('+(width/2)+',' + (height+40) + ')')
        .style('font-family', 'Helvetica')
        .style('font-size', 15)
        .text("Boroughs");

    // Title
    svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate('+(110)+',' + (-30) + ')')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text("No. of Childcare Centers in each Borough");

    // Y label
    svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(-40,' + (height/2) + ')rotate(-90)')
    .style('font-family', 'Helvetica')
    .style('font-size', 15)
    .text("No. of Child care centers");

    // var color = d3.scaleOrdinal(['red', 'gray', 'blue', 'black', 'orange'])

    // get the data
    //let boroughs = ['BROOKLYN', 'MANHATTAN', 'QUEENS', 'BRONX', 'STATEN ISLAND']
    let boroughs = data_for_plot1.map(function(d) {return d['Borough']})
    let boroughs_no = {'BROOKLYN':0, 'MANHATTAN':0, 
    'QUEENS':0, 'BRONX':0, 'STATEN ISLAND':0}
    // console.log(boroughs)
    boroughs.forEach(function(d) {boroughs_no[d] += 1})
    // console.log(boroughs_no)

    // Scale the range of the data in the domains
    x.domain(Object.keys(boroughs_no));
    y.domain([0, Math.max(...Object.values(boroughs_no))]);
    // console.log(Math.max(...Object.values(boroughs_no)))
    arr = Object.entries(boroughs_no)
    // console.log(arr)

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
    .data(arr)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return height - y(d[1]); })
    // .style("fill", function(d) { return color(d[0])})
    .on("mouseover", mouseover)
    .on("mouseleave", mouseleave)

    // add the x Axis
    svg.append("g")
        .style("font-size", "8px")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
        
    // add the y Axis
    svg.append("g")
    .call(d3.axisLeft(y))
    //.append("text");

    // d3.select('body')
    //     .select('svg')
    //     .append("text")
    //     .attr("transform", "translate(200,0)")
    //     .attr("x", 0)
    //     .attr("y", 25)
    //     .attr("font-size", "20px")
    //     .text("Bar plot");

    // svg.selectAll(".bar").on("click", function(d) {
    //     table(d[0])});
    svg.selectAll(".bar").on("click", function(d) {
        if((d3.select(this).style('fill'))=="rgb(0, 0, 255)") {
            d3.select(this).style("fill", "#ffb865"); //rgb(150, 200, 220)
            console.log(d)
            // stat[0] = Math.max(...stat)+1
            filterViaBar(d[0],"add")
        }
        else {d3.select(this).style("fill", "rgb(0, 0, 255)");
        // stat[0] = Math.max(...stat)+1
        filterViaBar(d[0],"remove")}
    });

};

function plot2_pieChart(data) {

    d3.select('body').select('#svg2').remove()

    //set the dimensions and margins of the graph
    var divWidth = document.getElementById('piechart1').clientWidth;
    var margin = {top: 50, right: 30, bottom: 50, left: 60},
    width = 200 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;
        
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#piechart1").append("svg").attr('id', 'svg2')
    // .attr("width", width + margin.left + margin.right)
    .attr("width", divWidth)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform","translate(" + (0) + "," + 0 + ")")
    .append("g")
    .attr("transform", 
        "translate(" + 100 + "," + 100 + ")");

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 1.5

//get the necessary data
var violation_status = data.map(function(d) { return d['Violation Status']})
violation_nos = {'Violation Closed':0, 'OPEN':0, 'CORRECTED':0}
violation_status.forEach(function(d) {violation_nos[d] += 1})

// removing the category with 0 count from the obj
keys = Object.keys(violation_nos)
keys.forEach(function(d) {
    if(violation_nos[d] == 0) {
        console.log(d)
        delete violation_nos[d]
    }
})

//calculating total 
var val = Object.values(violation_nos)
var total = 0
val.forEach(function(d) {total += d})

// Step 4
var ordScale = d3.scaleOrdinal()
            .domain(violation_nos)
            .range(["#9ab8c2", "#ffd384", "orange"]);

// Step 5
var pie = d3.pie().value(function(d) { 
        return d.value; 
    });

    var data_ready = pie(d3.entries(violation_nos))
    console.log(data_ready)
    var arc = svg.selectAll("arc")
            .data(data_ready)
            .enter();

// Step 6
var path = d3.arc()
                .outerRadius(radius)
                .innerRadius(0);

arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return ordScale(d.data.key); })
    .on("mouseover", mouseover)
    .on("mouseleave", mouseleave)
    .on("click", function(d) {
        console.log(d.data.key)
        var color;
        console.log(d3.select(this).style('fill'))
        if((d3.select(this).style('fill'))=="rgb(154, 184, 194)"||
        (d3.select(this).style('fill'))=="rgb(255, 165, 0)"||
        (d3.select(this).style('fill'))=="rgb(255, 211, 132)") {
            color = d3.select(this).style('fill')
            console.log(color)
            d3.select(this).style("fill", "#DC143C"); //rgb(150, 200, 220)
            console.log(d)
            filterViaPie2(d.data.key,"add")
        }
        else {d3.select(this).style("fill", color);
        filterViaPie2(d.data.key,"remove")}
    });

// Step 7
var label = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);
// var arr = [[10.31,20.04],[-23.85,-23.28],[-40.52,48.57]]
// var i = 0
arc.append("text")
    // .attr("transform", function(d) {i++;
    //         return "translate(" + arr[i-1] + ")rotate(-45)"; 
    // })
    .attr("transform", function(d) { 
        return "translate(" + label.centroid(d) + ")rotate(0)"; })
    .text(function(d) { return [Math.round(((d.data.value/total) + 
        Number.EPSILON) * 100)+'%']; }) //,d.data.key
    .style("font-family", "arial")
    .style("font-size", 7);

    d3.select('#svg2')
        .append("text")
        .attr("transform", "translate(50,0)")
        .attr("x", 0)
        .attr("y", 25)
        .attr("font-size", "15px")
        .text("Violation Status");

    var legend = svg.selectAll(".legend")
        .data(ordScale.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { 
            if(i==0) {return "translate(-50," + 48 + ")";}
            else if(i==1) {return "translate(-50," + 59 + ")";}
            else {return "translate(-50," + 70 + ")";} });
  
    legend.append("rect")
        .attr("x", 0)
        .attr("y", 25)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", ordScale);
    
    temp = Object.keys(violation_nos)

    legend.append("text")
        .attr("x", 100)
            // if(i==0) {return 80}
            // else if(i==1) {return 90}
            // else {return }})
        .attr("y", 32)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d,i) {return temp[i]})
        .style("font-size", 10);

}

function plot3_pieChart(data) {
    d3.select('body').select('#svg3').remove()

//set the dimensions and margins of the graph
var divWidth = document.getElementById('piechart2').clientWidth;
var margin = {top: 50, right: 0, bottom: 50, left: 60},
width = 170 - margin.left - margin.right,
height = 250 - margin.top - margin.bottom;
    
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#piechart2").append("svg").attr('id', 'svg3')
// .attr("width", width + margin.left + margin.right)
.attr("width", divWidth)
.attr("height", height + margin.top + margin.bottom)
.attr("transform","translate(" + 0 + "," + 0 + ")")
.append("g")
.attr("transform", 
    "translate(" + 100 + "," + 100 + ")");

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 1.7

//get the necessary data
var violation_status = data.map(function(d) { return d['Violation Category']})
violation_nos = {'No violation':0, 'PHH':0,
 'CRITICAL':0, 'GENERAL':0}
violation_status.forEach(function(d) {if(d =='PUBLIC HEALTH HAZARD'){
    violation_nos.PHH += 1}
else violation_nos[d] += 1})

// removing the category with 0 count from the obj
keys = Object.keys(violation_nos)
keys.forEach(function(d) {
    if(violation_nos[d] == 0) delete violation_nos[d]
})

//calculating total 
var val = Object.values(violation_nos)
var total = 0
val.forEach(function(d) {total += d})

// set the color scale
var color = d3.scaleOrdinal()
.domain(violation_nos)
.range(["#9ab8c2", "#c6e3f7", "orange", "#cfa46b"])

// Step 5
var pie = d3.pie().value(function(d) { 
    return d.value; 
});

var data_ready = pie(d3.entries(violation_nos))

var arc = svg.selectAll("arc")
        .data(data_ready)
        .enter();

// Step 6
var path = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

arc.append("path")
.attr("d", path)
.attr("fill", function(d) { return color(d.data.key); })
.on("mouseover", mouseover)
.on("mouseleave", mouseleave)
.on("click", function(d) {
    console.log(d.data.key)
    var color;
    console.log(d3.select(this).style('fill'))
    if((d3.select(this).style('fill'))=="rgb(154, 184, 194)"||
    (d3.select(this).style('fill'))=="rgb(255, 165, 0)"||
    (d3.select(this).style('fill'))=="rgb(198, 227, 247)"||
    (d3.select(this).style('fill'))=="rgb(207, 164, 107)") {
        color = d3.select(this).style('fill')
        console.log(color)
        d3.select(this).style("fill", "#DC143C"); //rgb(150, 200, 220)
        console.log(d)
        if(d.data.key == "PHH") {
            console.log(d.data.key)
            filterViaPie3("PUBLIC HEALTH HAZARD","add")
        }
        else filterViaPie3(d.data.key, "add")
        
    }
    else {
        d3.select(this).style("fill", color);
        if(d.data.key == "PHH") {
            filterViaPie3("PUBLIC HEALTH HAZARD","remove")
        }
        else filterViaPie3(d.data.key, "remove")
    }
});

// Step 7
var label = d3.arc()
        .outerRadius(60)
        .innerRadius(30);

// var i = 0
arc.append("text")
// .attr("transform", function(d) {i++;
//         if(i==2) { return "translate(" + arr[i-1] + ")rotate(70)"; }
//         else {return "translate(" + arr[i-1] + ")rotate(-45)";}
// })
.attr("transform", function(d) { 
    return "translate(" + label.centroid(d) + ")rotate(0)"; })
.text(function(d) { return [Math.round(((d.data.value/total) + 
    Number.EPSILON) * 100)+'%']; }) //,d.data.key
.style("font-family", "arial")
.style("font-size", 7);

d3.select('#svg3')
        .append("text")
        .attr("transform", "translate(50,5)")
        .attr("x", 0)
        .attr("y", 25)
        .attr("font-size", "15px")
        .text("Violation Category");

    d3.select('#svg3')
    .append("text")
    .attr("transform", "translate(50,5)")
    .attr("x", -10)
    .attr("y", 235)
    .attr("font-size", "10px")
    .text("PHH: Public Health Hazard");

    var legend = svg.selectAll(".legend")
    .data(color.domain())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { 
        if(i==0) {return "translate(-50," + 48 + ")";}
        else if(i==1) {return "translate(-50," + 59 + ")";}
        else if(i==2) {return "translate(-50," + 70 + ")";} 
        else {return "translate(-50," + 81 + ")";}});
  
    legend.append("rect")
        .attr("x", 0)
        .attr("y", 20)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", color);
    
    var temp = Object.keys(violation_nos)
    legend.append("text")
        .attr("x", 80)
            // if(i==0) {return 80}
            // else if(i==1) {return 90}
            // else {return }})
        .attr("y", 28)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d,i) {return temp[i]})
        .style("font-size", 10);
}

//reset button
var parHeight = document.getElementById('paragraph').clientHeight;
console.log(parHeight)
function reset() {
    stat = [0,0,0,0,0]
    filteredDataViaBar = []
    filteredDataViaPie2 = []
    filteredDataViaPie3 = []
    filteredDataViaScatter = []
    filteredDataViaHist = []
    ldataBar = []
    ldataPie2 = []
    ldataPie3 = []
    ldataScatter = []
    ldataHist = []
    plot1_barGraph(data)
    plot2_pieChart(data)
    plot3_pieChart(data)
    scatterPlot(data)
    histo(data)
    pcp_plot(data)
    scatter_mds_data(data)
}

// clickable pointer functions
var mouseover = function(d) {
    document.body.style.cursor = "pointer";
}

var mouseleave = function(d) {
    document.body.style.cursor = "default";
}




