/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 84.68371467025572, "KoPercent": 15.31628532974428};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.0030667878237164927, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.005706134094151213, 500, 1500, "SELECT Jumlah GROUPS"], "isController": false}, {"data": [0.0, 500, 1500, "SELECT Data Peserta"], "isController": false}, {"data": [0.0, 500, 1500, "DB SELECT Test"], "isController": true}, {"data": [0.003429355281207133, 500, 1500, "SELECT Jumlah Peserta"], "isController": false}, {"data": [0.005714285714285714, 500, 1500, "SELECT Jumlah Peserta Non Veget"], "isController": false}, {"data": [0.004297994269340974, 500, 1500, "SELECT Jumlah Peserta Veget"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3715, 569, 15.31628532974428, 8690.194885598912, 155, 46160, 11510.2, 12165.0, 19946.72000000005, 11.955447854616606, 8629.135323591574, 0.0], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["SELECT Jumlah GROUPS", 701, 14, 1.9971469329529243, 6555.2938659058555, 155, 10247, 9218.000000000002, 9763.099999999999, 10068.68, 2.365773567458295, 0.0823379004265817, 0.0], "isController": false}, {"data": ["SELECT Data Peserta", 787, 316, 40.15247776365947, 10659.804320203304, 2130, 12963, 12281.0, 12395.8, 12575.92, 2.5326884149618487, 7540.181553879365, 0.0], "isController": false}, {"data": ["DB SELECT Test", 787, 427, 54.2566709021601, 38692.95044472683, 10000, 50274, 44614.8, 45311.4, 47783.92, 2.5326884149618487, 7540.52433772873, 0.0], "isController": true}, {"data": ["SELECT Jumlah Peserta", 729, 149, 20.438957475994513, 10090.47050754458, 1132, 11566, 11210.0, 11291.5, 11385.900000000001, 2.3753897887564883, 0.0982076997738655, 0.0], "isController": false}, {"data": ["SELECT Jumlah Peserta Non Veget", 700, 9, 1.2857142857142858, 6269.061428571426, 708, 10966, 7935.7, 8687.75, 10187.390000000001, 2.4580636778953355, 0.08974264292762407, 0.0], "isController": false}, {"data": ["SELECT Jumlah Peserta Veget", 698, 41, 5.873925501432665, 8198.454154727791, 740, 11051, 10000.0, 10344.099999999999, 10834.21, 2.469590076352083, 0.0934830949836894, 0.0], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["null 0/java.sql.SQLException: Cannot get a connection, pool error Timeout waiting for idle object", 529, 92.9701230228471, 14.23956931359354], "isController": false}, {"data": ["null 0", 40, 7.0298769771529, 1.0767160161507403], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3715, 569, "null 0/java.sql.SQLException: Cannot get a connection, pool error Timeout waiting for idle object", 529, "null 0", 40, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["SELECT Jumlah GROUPS", 701, 14, "null 0/java.sql.SQLException: Cannot get a connection, pool error Timeout waiting for idle object", 14, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["SELECT Data Peserta", 787, 316, "null 0/java.sql.SQLException: Cannot get a connection, pool error Timeout waiting for idle object", 316, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["DB SELECT Test", 100, 40, "null 0", 40, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["SELECT Jumlah Peserta", 729, 149, "null 0/java.sql.SQLException: Cannot get a connection, pool error Timeout waiting for idle object", 149, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["SELECT Jumlah Peserta Non Veget", 700, 9, "null 0/java.sql.SQLException: Cannot get a connection, pool error Timeout waiting for idle object", 9, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["SELECT Jumlah Peserta Veget", 698, 41, "null 0/java.sql.SQLException: Cannot get a connection, pool error Timeout waiting for idle object", 41, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
