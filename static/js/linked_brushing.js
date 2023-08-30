// var filteredDataViaBar = []
// function filterViaBar(boroughName, action) {
//     // console.log(action)
//     if(action=='add') {
//         // console.log("line 4")
//         data.forEach(function(d) {
//             if(d['Borough']==boroughName) {
//                 filteredDataViaBar.push(d)
//             }
//         })
//         // console.log(filteredDataViaBar)
//         plot2_pieChart(filteredDataViaBar)
//         plot3_pieChart(filteredDataViaBar)
//         scatterPlot(filteredDataViaBar)
//         histo(filteredDataViaBar)
//         pcp_plot(filteredDataViaBar)
//         summaryBarGraph(filteredDataViaBar)
//     }
//     else {
//         // console.log("line 17")
//         filteredDataViaBar = 
//         filteredDataViaBar.filter((item) => item.Borough !== boroughName)
//         if((filteredDataViaBar.length)==0) {
//             plot2_pieChart(data)
//             plot3_pieChart(data)
//             scatterPlot(data)
//             histo(data)
//             pcp_plot(data)
//             summaryBarGraph(data) 
//         }
//         else {
//             plot2_pieChart(filteredDataViaBar)
//             plot3_pieChart(filteredDataViaBar)
//             scatterPlot(filteredDataViaBar)
//             histo(filteredDataViaBar)
//             pcp_plot(filteredDataViaBar)
//             summaryBarGraph(filteredDataViaBar) 
//         }       
//     }
// }

// // for scatter plot
// var filteredDataViaScatter = []

// function filterViaScatter() {
//     filteredDataViaScatter = []
//     var extent = d3.brushSelection(this)
//     myCircle.filter(function(){
//         var cx = d3.select(this).attr("cx"),cy = d3.select(this).attr("cy");
//         if(isBrushed(extent, cx, cy)) {
//             data.forEach(function(d) {
//                 if(xScale(d['TotalWorkers'])==cx) {
//                     if(yScale(d['MaxCap'])==cy) {
//                         var count = 0
//                         filteredDataViaScatter.forEach(function(e) {
//                             if(Object.entries(d).sort().toString()===
//                             Object.entries(e).sort().toString()) {
//                                 count++
//                             }
//                         })
//                         if(count==0) {
//                             filteredDataViaScatter.push(d)
//                         }
//                     }
//                 }
//             })
//         }
//     })
//     console.log(filteredDataViaScatter)
//     plot1_barGraph(filteredDataViaScatter)
//     plot2_pieChart(filteredDataViaScatter)
//     plot3_pieChart(filteredDataViaScatter)
//     histo(filteredDataViaScatter)
//     pcp_plot(filteredDataViaScatter)
//     summaryBarGraph(filteredDataViaScatter)
// }

// // A function that return TRUE or FALSE according if a dot is in the selection or not
// function isBrushed(brush_coords, cx, cy) {
//     var x0 = brush_coords[0][0],
//         x1 = brush_coords[1][0],
//         y0 = brush_coords[0][1],
//         y1 = brush_coords[1][1];
//     if((+cx+40 <= x1) && (+cx+40 >= x0)) {
//         if(((+cy+40) <= y1) && ((+cy+40) >= y0)) {
//             return true
//         }
//         return false
//     }
//     return false
// }

// //for piechart
// var filteredDataViaPie = []
// // function filterViaPie(pieChartNo, name, action) {
// //     console.log("reaching filterViaPie")
// // }
// function filterViaPie(pieChartNo, name, action) {
//     console.log(action)
//     if(action=='add') {
//         console.log("line 97")
//         data.forEach(function(d) {
//             if(pieChartNo == 1) {
//                 if(d['Violation Status']==name) {
//                     filteredDataViaPie.push(d)
//                 }
//             }
//             else {
//                 if(d['Violation Category']==name) {
//                     filteredDataViaPie.push(d)
//                 }
//             }
//         })
//         // console.log(filteredDataViaBar)
//         plot1_barGraph(filteredDataViaPie)
//         if(pieChartNo == 1){
//             plot3_pieChart(filteredDataViaPie)
//         }
//         else plot2_pieChart(filteredDataViaPie)
//         scatterPlot(filteredDataViaPie)
//         histo(filteredDataViaPie)
//         pcp_plot(filteredDataViaPie)
//         summaryBarGraph(filteredDataViaPie)
//     }
//     else {
//         // console.log("line 17")
//         if(pieChartNo == 1) {
//             filteredDataViaPie = 
//             filteredDataViaPie.filter((item) => item['Violation Status'] !== name)
//             if((filteredDataViaPie.length)==0) {
//                 plot1_barGraph(data)
//                 plot3_pieChart(data)
//                 scatterPlot(data)
//                 histo(data)
//                 pcp_plot(data)
//                 summaryBarGraph(data)
//             }
//             else {
//                 plot1_barGraph(filteredDataViaPie)
//                 plot3_pieChart(filteredDataViaPie)
//                 scatterPlot(filteredDataViaPie)
//                 histo(filteredDataViaPie)
//                 pcp_plot(filteredDataViaPie)
//                 summaryBarGraph(filteredDataViaPie)
//             }
//         }       
//         else {
//             filteredDataViaPie = 
//             filteredDataViaPie.filter((item) => item['Violation Category'] !== name)
//             if((filteredDataViaPie.length)==0) {
//                 plot1_barGraph(data)
//                 plot2_pieChart(data)
//                 scatterPlot(data)
//                 histo(data)
//                 pcp_plot(data)
//                 summaryBarGraph(data)
//             }
//             else {
//                 plot1_barGraph(filteredDataViaPie)
//                 plot2_pieChart(filteredDataViaPie)
//                 scatterPlot(filteredDataViaPie)
//                 histo(filteredDataViaPie)
//                 pcp_plot(filteredDataViaPie)
//                 summaryBarGraph(filteredDataViaPie)
//             }
//         }
//     }
// }
