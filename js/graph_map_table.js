function makeGraph(data) {
  graph_title = "% of Votes by Hour";
  if (time_wards[$("#time_ward").val()] != "All") {
    graph_title += ", Ward " + time_wards[$("#time_ward").val()];
  }
  if ($("#time_division").val() != "0") {
    graph_title += ", Division " + $("#time_division").val();
  }

  graph = new Dygraph(document.getElementById("time_graph"),
    data, {
      title: graph_title,
      drawGrid: true,
      independentTicks: true,
      labelsSeparateLines: true,
      legend: 'always',
      includeZero: true,
      ylabel: "% of Voters",
      xlabel: 'Time',
      visibility: [true],
      interactionModel: {},
      colors: ['#008837'],
      strokeWidth: 1.5
    });
  return (graph);
}

function whenClicked(e) {
  ward_num = e.sourceTarget.feature.properties.WARD_NUM;
  if (e.sourceTarget._mapToAdd._container.id == "results_map_div") {
    ward_dropdown = "#results_ward";
  }
  if (e.sourceTarget._mapToAdd._container.id == "choices_map_div") {
    ward_dropdown = "#choices_ward";
  }
  if (e.sourceTarget._mapToAdd._container.id == "cand_comb_map_div") {
    ward_dropdown = "#cand_comb_ward";
  }

  if (e.sourceTarget._mapToAdd._container.id == "time_map_div") {
    ward_dropdown = "#time_ward";
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



function makeTable(div, data) {

  division = cand_comb_division[$("#cand_comb_division").val()];
  if (division == "0") {
    division = "All";
  }
  final_data = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i][0].division == division) {
      final_data.push(data[i]);
    }
  }

  final_data = _.map(final_data[0], function(x) {
    return _.omit(x, ['division', 'ward']);
  });

  headers = _.keys(final_data[0]);
  z = [];
  for (var n = 0; n < headers.length; n++) {
    z.push({
      data: headers[n],
    });
  }

  var table = $(div).DataTable({
    data: final_data,
    columns: z,
    "ordering": false,
    "searching": false,
    "bInfo": false,
    "bPaginate": false, //hide pagination control
    "bFilter": false, //hide filter control
    "lengthChange": false,
    "scrollX": true,
    "sScrollXInner": "100%",
    "sScrollX": "100%",
  });
  return table;
}

function updateTable() {
  cand_data = getData("cand_comb");
  table.destroy();
  $('#table').empty();
  table = makeTable("#table", cand_data);


  title = cand_comb_offices[$('#cand_comb_ballot_position').val()];
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
  graph_data = getGraphData();
  subsetted_graph_data = subsetGraphData(graph_data);
  graph = makeGraph(subsetted_graph_data);
  return (graph);
}

function updateChart(type) {

  data = getData(type);
  data = subsetData(data, type);
  data = formatData(data, type);
  title_text = data[1];
  data = data[0];

  if (type == "choices") {
    chart_div = ctx_choices;
    chart_type = "bar";
    choices_chart.destroy();
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
          fontSize: 14
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
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
    results_chart.destroy();
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
          fontSize: 14
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
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
              return ' Votes: ' + tooltipItems.xLabel;
            }
          }
        }
      }
    });
  }
}
