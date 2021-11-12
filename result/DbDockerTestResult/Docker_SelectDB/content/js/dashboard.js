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

    var data = {"OkPercent": 75.88932806324111, "KoPercent": 24.110671936758894};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.008487654320987654, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.02576489533011272, 500, 1500, "SELECT Jumlah GROUPS"], "isController": false}, {"data": [0.0, 500, 1500, "SELECT Data Peserta"], "isController": false}, {"data": [0.0, 500, 1500, "DB SELECT Test"], "isController": true}, {"data": [7.507507507507507E-4, 500, 1500, "SELECT Jumlah Peserta"], "isController": false}, {"data": [0.017412935323383085, 500, 1500, "SELECT Jumlah Peserta Non Veget"], "isController": false}, {"data": [0.01, 500, 1500, "SELECT Jumlah Peserta Veget"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3289, 793, 24.110671936758894, 9921.779568257798, 239, 51924, 12303.0, 12680.0, 24107.1, 10.592046786639013, 8660.62299766256, 0.0], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["SELECT Jumlah GROUPS", 621, 57, 9.178743961352657, 7798.2576489533, 239, 10412, 10001.0, 10130.8, 10276.78, 2.091394970548713, 0.07748209495640401, 0.0], "isController": false}, {"data": ["SELECT Data Peserta", 699, 342, 48.927038626609445, 10973.84549356224, 2595, 13281, 12752.0, 12850.0, 13015.0, 2.2510917311829344, 7396.46881999438, 0.0], "isController": false}, {"data": ["DB SELECT Test", 699, 527, 75.3934191702432, 43614.0128755365, 10000, 55596, 51627.0, 52328.0, 54643.0, 2.2510844816869926, 7396.766751221551, 0.0], "isController": true}, {"data": ["SELECT Jumlah Peserta", 666, 211, 31.68168168168168, 10528.343843843839, 848, 11965, 11610.0, 11698.6, 11819.61, 2.1769330086456273, 0.09741205750404498, 0.0], "isController": false}, {"data": ["SELECT Jumlah Peserta Non Veget", 603, 28, 4.643449419568823, 8137.2487562189035, 954, 11159, 10610.0, 10854.8, 11064.880000000001, 2.029407904257718, 0.07608899252349974, 0.0], "isController": false}, {"data": ["SELECT Jumlah Peserta Veget", 600, 96, 16.0, 10090.196666666674, 1022, 11332, 11048.8, 11128.85, 11245.59, 2.132165854074569, 0.0870356764651533, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["null 0/java.sql.SQLException: Cannot get a connection, pool error Timeout waiting for idle object", 734, 92.55989911727616, 22.316813621161447], "isController": false}, {"data": ["null 0", 59, 7.440100882723834, 1.7938583155974461], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3289, 793, "null 0/java.sql.SQLException: Cannot get a connection, pool error Timeout waiting for idle object", 734, "null 0", 59, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["SELECT Jumlah GROUPS", 621, 57, "null 0/java.sql.SQLException: Cannot get a connection, pool error Timeout waiting for idle object", 57, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["SELECT Data Peserta", 699, 342, "null 0/java.sql.SQLException: Cannot get a connection, pool error Timeout waiting for idle object", 342, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["DB SELECT Test", 100, 59, "null 0", 59, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["SELECT Jumlah Peserta", 666, 211, "null 0/java.sql.SQLException: Cannot get a connection, pool error Timeout waiting for idle object", 211, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["SELECT Jumlah Peserta Non Veget", 603, 28, "null 0/java.sql.SQLException: Cannot get a connection, pool error Timeout waiting for idle object", 28, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["SELECT Jumlah Peserta Veget", 600, 96, "null 0/java.sql.SQLException: Cannot get a connection, pool error Timeout waiting for idle object", 96, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
