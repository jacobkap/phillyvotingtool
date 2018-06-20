function getData(type) {
  folder = "election_results/election_results_";
  office_dropdown = "#results_ballot_position";
  office_options = all_offices;
  ward_dropdown = '#results_ward';
  if (type == "choices") {
    folder = "num_selected/num_selected_";
    office_dropdown = "#choices_ballot_position";
    office_options = mult_offices;
    ward_dropdown = '#choices_ward';
  }
  if (type == "cond_cand") {
    folder = "cond_table/cond_table_";
    office_dropdown = "#cand_comb_ballot_position";
    office_options = mult_offices;
    ward_dropdown = '#cand_comb_ward';
  }

  url = "https://raw.githubusercontent.com/jacobkap/phillyvotingtool/master/data/";
  url += folder;
  url += office_options[$(office_dropdown).val()];
  url += "_ward_" + wards[$(ward_dropdown).val()];
  url += ".json";

  var data = $.getJSON({
    url: url,
    type: 'get',
    dataType: 'json',
    async: false,
    success: function(data) {
      result = data;
    }
  });
  data = data.responseJSON;
  return (data);
}

function getGraphData() {
  url = "https://raw.githubusercontent.com/jacobkap/phillyvotingtool/master/data/vote_time/election_";
  election = elections[$("#time_election").val()];
  election = election.toLowerCase().replace(" ", "_");
  url += election + "/election_" + election + "_ward_";
  url += wards[$("#time_ward").val()];
  url += "_time.json";
  var data = $.getJSON({
    url: url,
    type: 'get',
    dataType: 'json',
    async: false,
    success: function(data) {
      result = data;
    }
  });
  data = data.responseJSON;
  return (data);
}


function formatData(data, type) {

  // Default to results type
  title = all_offices[$('#results_ballot_position').val()];
  if (wards[$("#results_ward").val()] != "All") {
    title += ", Ward " + wards[$("#results_ward").val()];
    title_text = [title];
  }
  title_text = [title];

  if (type == "choices") {
    title = mult_offices[$('#choices_ballot_position').val()];
    if (wards[$("#choices_ward").val()] != "All") {
      title += ", Ward " + wards[$("#choices_ward").val()];
    }
    subtitle = "Max number of selections: " + mult_offices_choices[$('#choices_ballot_position').val()];
    title_text = [title, subtitle];
  }


  var formatted_data = {
    labels: data[0],
    datasets: [{
      data: data[1],
      backgroundColor: 'rgb(105,105,105)',
    }]
  };
  return [formatted_data, title_text];
}



function updateChart(type) {

  data = getData(type);
  data = formatData(data, type);
  title_text = data[1];
  data = data[0];

  chart_type = "horizontalBar";
  chart_div = ctx_results;
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
              min: 0,
              callback: function(value) {
                return value + "%";
              }
            },
            scaleLabel: {
              display: true,
              labelString: "Percentage"
            }
          }],
          xAxes: [{
            ticks: {
              min: 0,
              callback: function(value) {
                return value + "%";
              }
            },
            scaleLabel: {
              display: true,
              labelString: "Number of Candidates Voted For"
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
              return ' Votes: ' + tooltipItems.xLabel;
            }
          }
        }
      }
    });
  }
}



function whenClicked(e) {
  ward_num = e.sourceTarget.feature.properties.WARD_NUM;
  if (e.sourceTarget._mapToAdd._container.id == "results_map_div") {
    ward_dropdown = "#results_ward";
    update_type = 'results';
  }
  if (e.sourceTarget._mapToAdd._container.id == "choices_map_div") {
    ward_dropdown = "#choices_ward";
    update_type = 'choices';
  }
  if (e.sourceTarget._mapToAdd._container.id == "cand_comb_map_div") {
    ward_dropdown = "#cand_comb_ward";
  }

  $(ward_dropdown).val(ward_num);
  $(ward_dropdown).trigger("chosen:updated");
  if (e.sourceTarget._mapToAdd._container.id != "cand_comb_map_div") {
  updateChart(update_type);
}
if (e.sourceTarget._mapToAdd._container.id == "cand_comb_map_div") {
updateTable();
}
}


function onEachFeature(feature, layer) {
  //bind click
  layer.on({
    click: whenClicked
  });
}



function makeTable(div, data, headers) {

z = [];
  for (var i = 0; i < headers.length; i++) {
      z.push({
        title: headers[i],
      });
    }

  var table = $(div).DataTable({
    data: data,
    columns: z,
"ordering": false,
 "searching": false,
 "bInfo" : false,
 "bPaginate": false, //hide pagination control
"bFilter": false, //hide filter control
 "lengthChange": false
  });
  return table;
}

function updateTable() {
  cand_data = getData("cond_cand");
  table.destroy();
  $('#table').empty();
  table = makeTable("#table", cand_data, cand_data[0]);


  title = all_offices[$('#cand_comb_ballot_position').val()];
  if (wards[$("#cand_comb_ward").val()] != "All") {
    title += ", Ward " + wards[$("#cand_comb_ward").val()];
  }
  subtitle = "Max number of selections: " + mult_offices_choices[$('#cand_comb_ballot_position').val()];
  $("#table_title").text(title);
  $("#table_subtitle").text(subtitle);
}
