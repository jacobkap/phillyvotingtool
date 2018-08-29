function allowSaveGraph() {
  var url = myLine.toBase64Image();
  document.getElementById("time_graph").src = url;
}

function makeGraph(data, time_data) {
  election = elections[$(time_election).val()];
  graph_title = "Percent of Votes by Hour";
  yaxis_label = "% of Votes";
  if (time_wards[$("#time_ward").val()] != "All") {
    graph_title += ", Ward " + time_wards[$("#time_ward").val()];
  }
  if ($("#time_division").val() != "0") {
    graph_title += ", Division " + $("#time_division").val();
  }
  if ($("#vote_numbers").is(':checked')) {
    graph_title = "Number of Votes by Hour";
    yaxis_label = "# of Votes";
  }

  graph_title = election + ", " + graph_title;

  Chart.defaults.global.defaultFontColor = "#000000";
  if ($("#vote_time").is(':checked')) {
    myLineChart = new Chart(ctx_time, {
      type: 'line',
      data: {
        labels: ["7-8AM", "8-9AM", "9-10AM", "10-11AM", "11AM-12PM", "12-1PM",
          "1-2PM", "2-3PM", "3-4PM", "4-5PM", "5-6PM", "6-7PM", "7-8PM"
        ],
        datasets: [{
          label: yaxis_label,
          borderColor: "#1b9e77",
          fill: false,
          data: data,
          onAnimationComplete: allowSaveGraph,
        }, {
          label: 'Time to Vote (minutes)',
          borderColor: "#7570b3",
          fill: false,
          yAxisID: 'B',
          data: time_data
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
        },
        title: {
          display: true,
          position: 'top',
          text: graph_title,
          fontSize: 22
        },
        scales: {
          yAxes: [{
            id: 'A',
            type: 'linear',
            position: 'left',

            ticks: {
              beginAtZero: true,
              fontSize: 15,
              userCallback: function(value, index, values) {
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                value = value.join(',');
                return value;
              }
            },
            scaleLabel: {
              fontSize: 22,
              fontColor: "#000000",
              display: true,
              labelString: yaxis_label
            }
          }, {
            id: 'B',
            type: 'linear',
            position: 'right',
            ticks: {
              beginAtZero: true,
              fontSize: 15
            },
            scaleLabel: {
              fontSize: 22,
              fontColor: "#000000",
              display: true,
              labelString: "Time to Vote (in Minutes)"
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 15
            }
          }]
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(tooltipItems, data) {
              value = tooltipItems.yLabel;
              value = value.toLocaleString();
              if (tooltipItems.datasetIndex === 0) {
                return " " + yaxis_label + " " + value;
              } else {
                return " Minutes per Vote " + value;
              }
            }
          }
        },
        hover: {
          mode: 'nearest',
          intersect: true
        }
      }
    });
  } else {
    myLineChart = new Chart(ctx_time, {
      type: 'line',
      data: {
        labels: ["7-8AM", "8-9AM", "9-10AM", "10-11AM", "11AM-12PM", "12-1PM",
          "1-2PM", "2-3PM", "3-4PM", "4-5PM", "5-6PM", "6-7PM", "7-8PM"
        ],
        datasets: [{
          label: yaxis_label,
          borderColor: "#1b9e77",
          fill: false,
          data: data,
          onAnimationComplete: allowSaveGraph,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
        },
        title: {
          display: true,
          position: 'top',
          text: graph_title,
          fontSize: 22
        },
        scales: {
          yAxes: [{
            id: 'A',
            type: 'linear',
            position: 'left',
            ticks: {
              beginAtZero: true,
              fontSize: 15
            },
            scaleLabel: {
              fontSize: 22,
              fontColor: "#000000",
              display: true,
              labelString: yaxis_label
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 15
            }
          }]
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(tooltipItems, data) {
              value = tooltipItems.yLabel;
              value = value.toLocaleString();
              return " " + yaxis_label + " " + value;
            }
          }
        },
        hover: {
          mode: 'nearest',
          intersect: true
        }
      }
    });
  }


  return (myLineChart);
}

function whenClicked(e) {
  ward_num = e.sourceTarget.feature.properties.WARD_NUM;
  if (e.sourceTarget._mapToAdd._container.id == "results_map_div") {
    geojson.setStyle({
      color: '#28b78d'
    });
    results_map._layers[e.sourceTarget._leaflet_id].bringToFront();
    results_map._layers[e.sourceTarget._leaflet_id].setStyle({
      color: '#d95f02'
    });
    ward_dropdown = "#results_ward";
    ward_num = results_wards.indexOf(ward_num);
  }
  if (e.sourceTarget._mapToAdd._container.id == "choices_map_div") {
    geojson.setStyle({
      color: '#28b78d'
    });
    choices_map._layers[e.sourceTarget._leaflet_id].bringToFront();
    choices_map._layers[e.sourceTarget._leaflet_id].setStyle({
      color: '#d95f02'
    });
    ward_dropdown = "#choices_ward";
    ward_num = choices_wards.indexOf(ward_num);
  }
  if (e.sourceTarget._mapToAdd._container.id == "cand_comb_map_div") {
    geojson.setStyle({
      color: '#28b78d'
    });
    cand_comb_map._layers[e.sourceTarget._leaflet_id].bringToFront();
    cand_comb_map._layers[e.sourceTarget._leaflet_id].setStyle({
      color: '#d95f02'
    });
    ward_dropdown = "#cand_comb_ward";
    ward_num = cand_comb_wards.indexOf(ward_num);
  }

  if (e.sourceTarget._mapToAdd._container.id == "time_map_div") {
    geojson.setStyle({
      color: '#28b78d'
    });
    time_map._layers[e.sourceTarget._leaflet_id].bringToFront();
    time_map._layers[e.sourceTarget._leaflet_id].setStyle({
      color: '#d95f02'
    });
    ward_dropdown = "#time_ward";
    ward_num = time_wards.indexOf(ward_num);
  }


  $(ward_dropdown).val(ward_num);
  $(ward_dropdown).trigger("chosen:updated");
  if (e.sourceTarget._mapToAdd._container.id == "results_map_div") {
    resultsChange();
  } else if (e.sourceTarget._mapToAdd._container.id == "choices_map_div") {
    choicesChange();
  } else if (e.sourceTarget._mapToAdd._container.id == "time_map_div") {
    timeChange();
  } else if (e.sourceTarget._mapToAdd._container.id == "cand_comb_map_div") {
    candCombChange();
  }
}


function onEachFeature(feature, layer) {
  //bind click
  layer.on({
    click: whenClicked
  });
}



function makeTable(div, data, headers) {
  final_data = data;
  ward = cand_comb_wards[$("#cand_comb_ward").val()];
  if (ward != "All") {
    division = cand_comb_divisions[$("#cand_comb_division").val()];
    if (division == "0") {
      division = "All";
    }
    final_data = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].division == division) {
        final_data.push(data[i]);
      }
    }
  }

  final_data = _.map(final_data, function(x) {
    return _.omit(x, 'division');
  });
  final_data = _.map(final_data, function(x) {
    return _.omit(x, 0);
  });

  data_keys = _.keys(final_data[0]);
  for (var m = 0; m < final_data.length; m++) {
    for (n = 0; n < data_keys.length; n++) {
      final_data[m][data_keys[n]] = final_data[m][data_keys[n]].replace(/"/g, "");
    }
  }

  final_data[0][0] = "";
  if (_.keys(final_data[0]).toString() == _.keys(final_data[1]).toString()) {
    final_data.shift();
  }

  // headers = _.keys(final_data[0]);
  z = [];
  headers = headers.split(",");
  console.log(final_data[0]);
  real_headers = final_data[0];
  headers = headers.filter(function(item) {
    return item !== "division";
  });
  delete(final_data[0]["0"]);
  for (var n = 0; n < headers.length; n++) {
    z.push({
      data: headers[n],
      //  title: final_data[0][headers[n]],
      title: "",
      className: "dt-head-left dt-body-left"
    });
  }

  col_headers = final_data[0];
  final_data.shift();
  var table = $("#table").removeAttr('width').DataTable({
    data: final_data,
    columns: z,
    "stripe": false,
    "hover": true,
    "paging": false,
    "searching": false,
    "ordering": false,
    "autoWidth": false,
    "bInfo": false,
    fixedColumns: true,
    "order": [1, "desc"],
    "scrollX": true,
    "sScrollXInner": "100%",
    "sScrollX": "100%",
    "lengthChange": false,
    responsive: false,
  });
  $("#table_wrapper").css("width", "95%");

  $($.fn.dataTable.tables(true)).DataTable()
    .columns.adjust()
    .responsive.recalc();
  // $('td', 2).eq(2).addClass('highlight');
  // $("table thead tr th:nth-child(2)").attr("colspan", 5);
  group_header_cols(real_headers);
  bold_color_table();


  return table;
}



function bold_color_table() {
  // Checks all cells and makes the background brown if they have an empty string
  // The color is just a placeholder for now.
  $('#table tr').each(function() {
    $(this).find('td').each(function() {
      if ($(this).text() === "") {
        $(this).css("background-color", "#e7e3e2");
        $(this).closest("td").next().css("font-weight", "bold");
        $(this).css("font-weight", "normal");
      }
    });
  });

  // Forces the top-left data cell to be bold
  $("#table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)").css("font-weight", "bold");

  // Makes top left cell transparent background
  $("#table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)").css("background-color", "transparent");

  // Forces the top-left header cell (first candiate name) to NOT be bold
  $("#table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)").css("font-weight", "normal");

  //$('#table th').text('<tr><th colspan="5">my data</th></tr>');
}

function group_header_cols(headers) {

  headers = _.values(headers);
  second_office = false;
  to_remove = [];
  for (var n = 2; n < headers.length; n++) {
    console.log(n);
    if (headers[n] !== "") {
      second_office = true;
      $("#table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(" + n + ")").css("color", "#1b9e77");
          $(".DTFC_LeftBodyLiner > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + n + ") > td:nth-child(1)").css("color", "#1b9e77");
    }
    if (headers[n] === "" & second_office === false) {
      $("#table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(" + n + ")").css("color", "#1b9e77");
      $(".DTFC_LeftBodyLiner > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + n + ") > td:nth-child(1)").css("color", "#1b9e77");
    }
    if (headers[n] === "" & second_office === true) {
      $("#table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(" + n + ")").css("color", "#d95f02");
      $(".DTFC_LeftBodyLiner > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + n + ") > td:nth-child(1)").css("color", "#d95f02");
    }
  }
  col = "#1b9e77";
  if (second_office === true) {
    col = "#d95f02";
  }
  // Force first to be green
  $("#table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)").css("color", "#1b9e77");
  $(".DTFC_LeftBodyLiner > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(1)").css("color", "#1b9e77");

  $("#table > tbody:nth-child(2) > tr:nth-child(1) > td:last()").css("color", col);
  $(".DTFC_LeftBodyLiner > table:nth-child(1) > tbody:nth-child(2) > tr:nth-last-child(2) > td:nth-child(1)").css("color", col);
}


function updateTable() {
  cand_data = getData("cand_comb");
  cand_data = cand_data.split("\n");
  cand_data.pop();
  headers = cand_data[0];
  cand_data = data_object_fun(cand_data, headers);
  cand_data.shift();
  table.destroy();
  $('#table').empty();
  table = makeTable("#table", cand_data, headers);

}

function updateGraph() {
  graph.destroy();
  graph_data = getGraphData();
  subsetted_graph_data = subsetGraphData(graph_data);
  subsetted_graph_data_time = subsetGraphData(graph_data, type = "time");
  graph = makeGraph(subsetted_graph_data, subsetted_graph_data_time);
  return (graph);
}

function updateChart(chart, type) {
  chart.destroy();
  data = makeChart(type);
  return data;
}

function makeChart(type) {
  Chart.defaults.global.defaultFontColor = "#000000";
  data = getData(type);
  data_for_csv = subsetData(data, type);
  data = formatData(data_for_csv, type);
  title_text = data[1];
  data = data[0];

  if (type == "choices") {
    chart_div = ctx_choices;
    chart_type = "bar";
    choices_chart = new Chart(chart_div, {
      type: chart_type,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        title: {
          display: true,
          position: 'top',
          text: title_text,
          fontSize: 22
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 15
            },
            scaleLabel: {
              fontSize: 22,
              display: true,
              labelString: '% of Votes'
            }
          }],
          xAxes: [{
            scaleLabel: {
              fontSize: 22,
              display: true,
              labelString: '# of Selections Made'
            },
            ticks: {
              fontSize: 15
            }
          }]
        },
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function(tooltipItems, data) {
              return ' % who voted for ' + tooltipItems.xLabel + " choices:" + tooltipItems.yLabel;
            }
          }
        }
      }
    });
  }
  if (type == "results") {

    chart_type = "horizontalBar";
    chart_div = ctx_results;
    results_chart = new Chart(chart_div, {
      type: chart_type,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        title: {
          display: true,
          position: 'top',
          text: title_text,
          fontSize: 22
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 15,
              userCallback: function(value, index, values) {
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                value = value.join(',');
                return value;
              }
            },
            scaleLabel: {
              fontSize: 20,
              display: true,
              labelString: '# of Votes'
            }
          }]
        },
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function(tooltipItems, data) {
              value = tooltipItems.xLabel;
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
            }
          }
        }
      }
    });
  }

  return data_for_csv;
}
