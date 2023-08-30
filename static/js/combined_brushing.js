var stat = [0,0,0,0,0]
var filteredDataViaBar = []
var ldataBar = []
function filterViaBar(boroughName, action) {
    // console.log(action)
    var maxValueIndex = stat.indexOf(Math.max(...stat))
    console.log(maxValueIndex)
    if(maxValueIndex==0) {
        if(stat[0]==0) ldataBar = data
    }
    else if(maxValueIndex==1) ldataBar = filteredDataViaPie2
    else if(maxValueIndex==2) ldataBar = filteredDataViaPie3
    else if(maxValueIndex==3) ldataBar = filteredDataViaScatter
    else if(maxValueIndex==4) ldataBar = filteredDataViaHist
    if(action=='add') {
        // console.log("line 4")
        ldataBar.forEach(function(d) {
            if(d['Borough']==boroughName) {
                filteredDataViaBar.push(d)
            }
        })
        console.log(filteredDataViaBar.length)
        if(stat[1]==0) plot2_pieChart(filteredDataViaBar)
        if(stat[2]==0) plot3_pieChart(filteredDataViaBar)
        if(stat[3]==0) scatterPlot(filteredDataViaBar)
        if(stat[4]==0) histo(filteredDataViaBar)
        pcp_plot(filteredDataViaBar)
        // summaryBarGraph(filteredDataViaBar)
        scatter_mds_data(filteredDataViaBar)
        stat[0] = Math.max(...stat)+1
        console.log(stat.join())
    }
    else {
        // console.log("line 17")
        filteredDataViaBar = 
        filteredDataViaBar.filter((item) => item.Borough !== boroughName)
        if((filteredDataViaBar.length)==0) {
            console.log(filteredDataViaBar.length)
            if(stat[1]==0) plot2_pieChart(ldataBar)
            if(stat[2]==0) plot3_pieChart(ldataBar)
            if(stat[3]==0) scatterPlot(ldataBar)
            if(stat[4]==0) histo(ldataBar)
            pcp_plot(ldataBar)
            // summaryBarGraph(ldataBar)
            scatter_mds_data(ldataBar)
            stat[0] = 0
            console.log(stat.join())
        }
        else {
            console.log(filteredDataViaBar.length)
            if(stat[1]==0) plot2_pieChart(filteredDataViaBar)
            if(stat[2]==0) plot3_pieChart(filteredDataViaBar)
            if(stat[3]==0) scatterPlot(filteredDataViaBar)
            if(stat[4]==0) histo(filteredDataViaBar)
            pcp_plot(filteredDataViaBar)
            // summaryBarGraph(filteredDataViaBar) 
            scatter_mds_data(filteredDataViaBar)
            console.log(stat.join())
        }       
    }
}

// for scatter plot
var filteredDataViaScatter = []
var ldataScatter = []
function filterViaScatter() {
    filteredDataViaScatter = []
    
    var maxValueIndex = stat.indexOf(Math.max(...stat))
    if(maxValueIndex==0) {
        if(stat[0]==0) ldataScatter = data
        else ldataScatter = filteredDataViaBar
    }
    else if(maxValueIndex==1) ldataScatter = filteredDataViaPie2
    else if(maxValueIndex==2) ldataScatter = filteredDataViaPie3
    // else if(maxValueIndex==3) ldata = data
    else if(maxValueIndex==4) ldataScatter = filteredDataViaHist
    var extent = d3.brushSelection(this)
    myCircle.filter(function(){
        var cx = d3.select(this).attr("cx"),cy = d3.select(this).attr("cy");
        if(isBrushed(extent, cx, cy)) {
            ldataScatter.forEach(function(d) {
                if(xScale(d['TotalWorkers'])==cx) {
                    if(yScale(d['MaxCap'])==cy) {
                        var count = 0
                        filteredDataViaScatter.forEach(function(e) {
                            if(Object.entries(d).sort().toString()===
                            Object.entries(e).sort().toString()) {
                                count++
                            }
                        })
                        if(count==0) {
                            filteredDataViaScatter.push(d)
                        }
                    }
                }
            })
        }
    })
    console.log(filteredDataViaScatter.length)
    if(stat[0]==0) plot1_barGraph(filteredDataViaScatter)
    if(stat[1]==0) plot2_pieChart(filteredDataViaScatter)
    if(stat[2]==0) plot3_pieChart(filteredDataViaScatter)
    if(stat[4]==0) histo(filteredDataViaScatter)
    pcp_plot(filteredDataViaScatter)
    // summaryBarGraph(filteredDataViaScatter)
    scatter_mds_data(filteredDataViaScatter)
    stat[3] = Math.max(...stat)+1
    console.log(stat.join())
}

// A function that return TRUE or FALSE according if a dot is in the selection or not
function isBrushed(brush_coords, cx, cy) {
    var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
    if((+cx+40 <= x1) && (+cx+40 >= x0)) {
        if(((+cy+40) <= y1) && ((+cy+40) >= y0)) {
            return true
        }
        return false
    }
    return false
}

//for piechart
var filteredDataViaPie2 = []
var filteredDataViaPie3 = []
// function filterViaPie(pieChartNo, name, action) {
//     console.log("reaching filterViaPie")
// }
var ldataPie2 = []
function filterViaPie2(name, action) {
    console.log(action)
    var maxValueIndex = stat.indexOf(Math.max(...stat))
    if(maxValueIndex==0) {
        if(stat[0]==0) ldataPie2 = data
        else ldataPie2 = filteredDataViaBar
    }
    // else if(maxValueIndex==1) ldata = data
    else if(maxValueIndex==2) ldataPie2 = filteredDataViaPie3
    else if(maxValueIndex==3) ldataPie2 = filteredDataViaScatter
    else if(maxValueIndex==4) ldataPie2 = filteredDataViaHist
    if(action=='add') {
        console.log("line 132")
        ldataPie2.forEach(function(d) {
            if(d['Violation Status']==name) {
                filteredDataViaPie2.push(d)
            }
        })
        console.log(filteredDataViaPie2.length)
        if(stat[0]==0) plot1_barGraph(filteredDataViaPie2)
        if(stat[2]==0) plot3_pieChart(filteredDataViaPie2)
        if(stat[3]==0) scatterPlot(filteredDataViaPie2)
        if(stat[4]==0) histo(filteredDataViaPie2)
        pcp_plot(filteredDataViaPie2)
        // summaryBarGraph(filteredDataViaPie2)
        scatter_mds_data(filteredDataViaPie2)
        stat[1] = Math.max(...stat)+1
        console.log(stat.join())
    }
    else {
        // console.log("line 17")
        filteredDataViaPie2 = 
        filteredDataViaPie2.filter((item) => item['Violation Status'] !== name)
        if((filteredDataViaPie2.length)==0) {
            console.log(filteredDataViaPie2.length)
            if(stat[0]==0) plot1_barGraph(ldataPie2)
            if(stat[2]==0) plot3_pieChart(ldataPie2)
            if(stat[3]==0) scatterPlot(ldataPie2)
            if(stat[4]==0) histo(ldataPie2)
            pcp_plot(ldataPie2)
            // summaryBarGraph(ldataPie2)
            scatter_mds_data(ldataPie2)
            stat[1] = 0
            console.log(stat.join())
        }
        else {
            console.log(filteredDataViaPie2.length)
            if(stat[0]==0) plot1_barGraph(filteredDataViaPie2)
            if(stat[2]==0) plot3_pieChart(filteredDataViaPie2)
            if(stat[3]==0) scatterPlot(filteredDataViaPie2)
            if(stat[4]==0) histo(filteredDataViaPie2)
            pcp_plot(filteredDataViaPie2)
            // summaryBarGraph(filteredDataViaPie2)
            scatter_mds_data(filteredDataViaPie2)
            console.log(stat.join())
        }     
    }
}

var ldataPie3 = []
function filterViaPie3(name, action) {
    console.log(action)
    
    var maxValueIndex = stat.indexOf(Math.max(...stat))
    if(maxValueIndex==0) {
        if(stat[0]==0) ldataPie3 = data
        else ldataPie3 = filteredDataViaBar
    }
    else if(maxValueIndex==1) ldataPie3 = filteredDataViaPie2
    // else if(maxValueIndex==2) ldata = data
    else if(maxValueIndex==3) ldataPie3 = filteredDataViaScatter
    else if(maxValueIndex==4) ldataPie3 = filteredDataViaHist
    if(action=='add') {
        console.log("line 97")
        ldataPie3.forEach(function(d) {
            if(d['Violation Category']==name) {
                filteredDataViaPie3.push(d)
            }
        })
        console.log(filteredDataViaPie3.length)
        if(stat[0]==0) plot1_barGraph(filteredDataViaPie3)
        if(stat[1]==0) plot2_pieChart(filteredDataViaPie3)
        if(stat[3]==0) scatterPlot(filteredDataViaPie3)
        if(stat[4]==0) histo(filteredDataViaPie3)
        pcp_plot(filteredDataViaPie3)
        // summaryBarGraph(filteredDataViaPie3)
        scatter_mds_data(filteredDataViaPie3)
        stat[2] = Math.max(...stat)+1
        console.log(stat.join())
    }
    else {
        // console.log("line 17")
        filteredDataViaPie3 = 
        filteredDataViaPie3.filter((item) => item['Violation Category'] !== name)
        if((filteredDataViaPie3.length)==0) {
            console.log(filteredDataViaPie3.length)
            if(stat[0]==0) plot1_barGraph(ldataPie3)
            if(stat[1]==0) plot2_pieChart(ldataPie3)
            if(stat[3]==0) scatterPlot(ldataPie3)
            if(stat[4]==0) histo(ldataPie3)
            pcp_plot(ldataPie3)
            // summaryBarGraph(ldataPie3)
            scatter_mds_data(ldataPie3)
            stat[2] = 0
            console.log(stat.join())
        }
        else {
            console.log(filteredDataViaPie3.length)
            if(stat[0]==0) plot1_barGraph(filteredDataViaPie3)
            if(stat[1]==0) plot2_pieChart(filteredDataViaPie3)
            if(stat[3]==0) scatterPlot(filteredDataViaPie3)
            if(stat[4]==0) histo(filteredDataViaPie3)
            pcp_plot(filteredDataViaPie3)
            // summaryBarGraph(filteredDataViaPie3)
            scatter_mds_data(filteredDataViaPie3)
            console.log(stat.join())
        }
    }
}

//histogram
var filteredDataViaHist = []
var ldataHist = []
function filterViaHist(arr, action) {
    var maxValueIndex = stat.indexOf(Math.max(...stat))
    if(maxValueIndex==0) {
        if(stat[0]==0) ldataHist = data
        else ldataHist = filteredDataViaBar
    }
    else if(maxValueIndex==1) ldataHist = filteredDataViaPie2
    else if(maxValueIndex==2) ldataHist = filteredDataViaPie3
    else if(maxValueIndex==3) ldataHist = filteredDataViaScatter
    // else if(maxValueIndex==4) ldataScatter = filteredDataViaHist
    if(action=='add') {
        arr.forEach(function(d) {
            filteredDataViaHist.push(d)
        })
        console.log(filteredDataViaHist.length)
        if(stat[0]==0) plot1_barGraph(filteredDataViaHist)
        if(stat[1]==0) plot2_pieChart(filteredDataViaHist)
        if(stat[2]==0) plot3_pieChart(filteredDataViaHist)
        if(stat[3]==0) scatterPlot(filteredDataViaHist)
        pcp_plot(filteredDataViaHist)
        // summaryBarGraph(filteredDataViaHist)
        scatter_mds_data(filteredDataViaHist)
        stat[4] = Math.max(...stat)+1
        console.log(stat.join())
    }
    else {
        var temp = filteredDataViaHist
        const toDeleteSet = new Set(arr);
        filteredDataViaHist = temp.filter(obj => {
            return !toDeleteSet.has(obj)
        })
        console.log(filteredDataViaHist.length)
        if(filteredDataViaHist.length==0) {
            if(stat[0]==0) plot1_barGraph(ldataHist)
            if(stat[1]==0) plot2_pieChart(ldataHist)
            if(stat[2]==0) plot3_pieChart(ldataHist)
            if(stat[3]==0) scatterPlot(ldataHist)
            pcp_plot(ldataHist)
            // summaryBarGraph(ldataHist)
            scatter_mds_data(ldataHist)
            stat[4] = 0
            console.log(stat.join())
        }
        else {
            console.log(filteredDataViaHist.length)
            if(stat[0]==0) plot1_barGraph(filteredDataViaHist)
            if(stat[1]==0) plot2_pieChart(filteredDataViaHist)
            if(stat[2]==0) plot3_pieChart(filteredDataViaHist)
            if(stat[3]==0) scatterPlot(filteredDataViaHist)
            pcp_plot(filteredDataViaHist)
            // summaryBarGraph(filteredDataViaHist)
            scatter_mds_data(filteredDataViaHist)
            console.log(stat.join())
        }
    }
}

