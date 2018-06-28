function resultsElectionChange() {
  setOffices("election_results", "#results_election", "#results_ballot_position");
  resultsChange();
}

function choicesElectionChange() {
  choices_offices = setOffices("num_selected",
    "#choices_election",
    "#choices_ballot_position");
  choicesChange();
}

function resultsChange() {
  results_wards = getWards("election_results", "#results_election", "#results_ballot_position", results_offices);
  $.each(results_wards, function(val, text) {
    $('#results_ward').append(new Option(text, val));
  });
  $('#results_ward').val(0);
  setDivisionDropdown("#results_ward", "#results_division");
  updateChart('results');
}

function choicesChange() {
  setDivisionDropdown("#choices_ward", "#choices_division");
  updateChart('choices');
}

function timeChange() {
  setDivisionDropdown("#time_ward", "#time_division");
  graph = updateGraph();
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
