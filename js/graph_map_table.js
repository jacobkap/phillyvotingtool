function makeGraph(data) {
  graph_title = "% of Votes by Hour";
  if (wards[$("#time_ward").val()] != "All") {
    graph_title += ", Ward " + wards[$("#time_ward").val()];
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
      strokeWidth: 1.3 // Width of lines
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
