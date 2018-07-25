function allowSaveGraph() {
  var url = myLine.toBase64Image();
  document.getElementById("time_graph").src = url;
}

function makeGraph(data) {
  election = elections[$(time_election).val()];
  graph_title = "Percent of Votes by Hour";
  if (time_wards[$("#time_ward").val()] != "All") {
    graph_title += ", Ward " + time_wards[$("#time_ward").val()];
  }
  if ($("#time_division").val() != "0") {
    graph_title += ", Division " + $("#time_division").val();
  }
  if ($("#cum_sum").is(':checked')) {
    graph_title = "Cumulative Total Percent of Votes";
  }

  graph_title = election + ", " + graph_title;

  Chart.defaults.global.defaultFontColor = "#000000";
  myLineChart = new Chart(ctx_time, {
    type: 'line',
    data: {
      labels: ["7-8AM", "8-9AM", "9-10AM", "10-11AM", "11AM-12PM", "12-1PM",
        "1-2PM", "2-3PM", "3-4PM", "4-5PM", "5-6PM", "6-7PM", "7-8PM"
      ],
      datasets: [{
        borderColor: "#000000",
        fill: false,
        data: data,
        onAnimationComplete: allowSaveGraph,
      }]
    },
    options: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        position: 'top',
        text: graph_title,
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
            fontColor: "#000000",
            display: true,
            labelString: '% of Votes'
          }
        }],
        xAxes: [{
          ticks: {
            fontSize: 15
          }
        }]
      },
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      }
    }
  });

  return (myLineChart);
}

function whenClicked(e) {
  ward_num = e.sourceTarget.feature.properties.WARD_NUM;
  if (e.sourceTarget._mapToAdd._container.id == "results_map_div") {
    geojson.setStyle({color: '#28b78d'});
    results_map._layers[e.sourceTarget._leaflet_id].bringToFront();
    results_map._layers[e.sourceTarget._leaflet_id].setStyle({color: '#BA0C2F'});
    ward_dropdown = "#results_ward";
    ward_num = results_wards.indexOf(ward_num);
  }
  if (e.sourceTarget._mapToAdd._container.id == "choices_map_div") {
    geojson.setStyle({color: '#28b78d'});
    choices_map._layers[e.sourceTarget._leaflet_id].bringToFront();
    choices_map._layers[e.sourceTarget._leaflet_id].setStyle({color: '#BA0C2F'});
    ward_dropdown = "#choices_ward";
    ward_num = choices_wards.indexOf(ward_num);
  }
  if (e.sourceTarget._mapToAdd._container.id == "cand_comb_map_div") {
    geojson.setStyle({color: '#28b78d'});
    cand_comb_map._layers[e.sourceTarget._leaflet_id].bringToFront();
    cand_comb_map._layers[e.sourceTarget._leaflet_id].setStyle({color: '#BA0C2F'});
    ward_dropdown = "#cand_comb_ward";
    ward_num = cand_comb_wards.indexOf(ward_num);
  }

  if (e.sourceTarget._mapToAdd._container.id == "time_map_div") {
    geojson.setStyle({color: '#28b78d'});
    time_map._layers[e.sourceTarget._leaflet_id].bringToFront();
    time_map._layers[e.sourceTarget._leaflet_id].setStyle({color: '#BA0C2F'});
    ward_dropdown = "#time_ward";
    ward_num = time_wards.indexOf(ward_num);
  }


  $(ward_dropdown).val(ward_num);
  $(ward_dropdown).trigger("chosen:updated");
  if (e.sourceTarget._mapToAdd._container.id == "results_map_div") {
    resultsChange();
  }
  if (e.sourceTarget._mapToAdd._container.id == "choices_map_div") {
    choicesChange();
  }
  if (e.sourceTarget._mapToAdd._container.id == "time_map_div") {
    timeChange();
  }
  if (e.sourceTarget._mapToAdd._container.id == "cand_comb_map_div") {
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
    division = cand_comb_division[$("#cand_comb_division").val()];
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
  headers = headers.filter(function(item) {
    return item !== "division";
  });
delete(final_data[0]["0"]);
  for (var n = 0; n < headers.length; n++) {
    console.log(headers[n])
    z.push({
      data: headers[n],
      title: headers[n],
      className: "dt-head-left dt-body-right"
    });
  }

  var table = $("#table").DataTable({
    data: final_data,
    columns: z,
    "scrollX": true,
  "sScrollXInner": "100%",
  "sScrollX": "100%",
  "stripe": true,
  "hover": true,
  "lengthChange": false,
  "paging": false,
  "searching": false,
  "pageLength": 100,
  "ordering": true,
  "order": [1, "desc"],
  "fixedHeader": true,
  fixedColumns: {
    leftColumns: 2
  }
  });
  $("#table_wrapper").css("width", "100%");


  return table;
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


  title = cand_comb_offices[$('#cand_comb_ballot_position').val()[0]];
  if ($('#cand_comb_ballot_position').val().length > 1) {
    title += " and " + cand_comb_offices[$('#cand_comb_ballot_position').val()[1]];
  }
  if (cand_comb_wards[$("#cand_comb_ward").val()] != "All") {
    title += ", Ward " + cand_comb_wards[$("#cand_comb_ward").val()];
  }
  if (cand_comb_division[$("#cand_comb_division").val()] != "All") {
    title += ", Division " + cand_comb_division[$("#cand_comb_division").val()];
  }
  //  subtitle = "Max number of selections: " + cand_comb_offices[$('#cand_comb_ballot_position').val()];
  $("#table_title").text(title);
  //  $("#table_subtitle").text(subtitle);
}

function updateGraph() {
  graph.destroy();
  graph_data = getGraphData();
  subsetted_graph_data = subsetGraphData(graph_data);
  graph = makeGraph(subsetted_graph_data);
  return (graph);
}

function updateChart(chart, type) {
  chart.destroy();
  makeChart(type);
}

function makeChart(type) {
  Chart.defaults.global.defaultFontColor = "#000000";
  data = getData(type);
  data = subsetData(data, type);
  data = formatData(data, type);
  title_text = data[1];
  data = data[0];

  if (type == "choices") {
    chart_div = ctx_choices;
    chart_type = "bar";
    choices_chart = new Chart(chart_div, {
      type: chart_type,
      data: data,
      options: {
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
          }],
          yAxes: [{
            ticks: {
              fontSize: 22
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
}
