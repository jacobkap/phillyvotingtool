/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function resizeChosen() {
   $(".chosen-container").each(function() {
       $(this).attr('style', 'width: 95%');
   });
}

function setDivisionDropdown(ward_dropdown, division_dropdown) {
  $(division_dropdown).empty();
  temp_division = ["All"];
  ward_num = wards[$(ward_dropdown).val()];

  if (ward_num != "All") {
    division_num = _.filter(max_divisions, function(x) {
      return x.ward == ward_num;
    });
    division_num = division_num[0].max_division;
    for (var i = 1; i < division_num + 1; i++) {
      temp_division.push(i);
    }
  }
  $.each(temp_division, function(val, text) {
    $(division_dropdown).append(new Option(text, val));
  });
  $(division_dropdown).val(0);
  $('.simple-select').chosen();
  $('.simple-select').trigger('chosen:updated');
}

function setOffices(type, election_dropdown, ballot_dropdow) {
  offices = getOffices(type, election_dropdown);
  $(ballot_dropdow).clear();
  $.each(results_offices, function(val, text) {
          $(ballot_dropdow).append( new Option(text,val) );
      });
      $(ballot_dropdow).val(0);
}

function getOffices(type, election_dropdown) {
url = "https://raw.githubusercontent.com/jacobkap/phillyvotingtool/master/data/";
url += type + "/";
election = elections[$(election_dropdown).val()];
election = election.toLowerCase().replace(" ", "_");
election = election.replace(" ", "_");
url += election + "/";
url += type + "_" + "office_choices.json";
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

function getData(type) {
  folder = "election_results";
  office_dropdown = "#results_ballot_position";
  office_options = all_offices;
  election_dropdown = "#results_election";
  if (type == "choices") {
    folder = "num_selected";
    office_dropdown = "#choices_ballot_position";
    office_options = mult_offices;
    election_dropdown = "#choices_election";
  }
  if (type == "cond_cand") {
    folder = "cond_table";
    office_dropdown = "#cand_comb_ballot_position";
    office_options = mult_offices;
  }
  election = elections[$(election_dropdown).val()];
  election = election.toLowerCase().replace(" ", "_");
  election = election.replace(" ", "_");
  url = "https://raw.githubusercontent.com/jacobkap/phillyvotingtool/master/data/";
  url += folder + "/";
  url += election + "/";
  url += folder + "_";
  url += office_options[$(office_dropdown).val()];
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

function makeGraph(data) {
  graph = new Dygraph(document.getElementById("time_graph"),
    data, {
      title: 'title',
      drawGrid: true,
      independentTicks: true,
      labelsSeparateLines: true,
      legend: 'always',
      ylabel: "% of Voters",
      xlabel: 'Hour',
      visibility: [true],
      interactionModel: {},
      colors: ['#008837'],
      strokeWidth: 1.3 // Width of lines
    });
  return (graph);
}

function resultsElectionChange() {
  setOffices("election_results", "#results_election", "#results_ballot_position");
  resultsChange();
}

function resultsChange() {
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



function getGraphData() {
  url = "https://raw.githubusercontent.com/jacobkap/phillyvotingtool/master/data/vote_time/election_";
  election = elections[$("#time_election").val()];
  election = election.toLowerCase().replace(" ", "_");
  election = election.replace(" ", "_");
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

function subsetGraphData(data) {
  var final_data = [];
  division = $("#time_division").val();
  if (division === "0") {
    division = "All";
  }
  for (var i = 0; i < data[0].length; i++) {
    if (data[3][i] == division) {
      temp = [parseFloat(data[0][i]), parseFloat(data[2][i])];
      final_data.push(temp);
    }
  }
  return final_data;
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
    "bInfo": false,
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
