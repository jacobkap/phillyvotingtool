function resultsElectionChange() {
  results_offices = setOffices("election_results", "#results_election", "#results_ballot_position");
  $('#results_ward').empty();
  results_wards = getWards_locations("election_results", "#results_election", "#results_ballot_position", results_offices);
  $.each(results_wards, function(val, text) {
    $('#results_ward').append(new Option(text, val));
  });
  resultsChange();
}

function resultsOfficeChange() {
  $('#results_ward').empty();
  results_wards = getWards_locations("election_results", "#results_election", "#results_ballot_position", results_offices);


  $.each(results_wards, function(val, text) {
    $('#results_ward').append(new Option(text, val));
  });
  resultsChange();
}

function resultsChange() {
  results_divisions = setDivisionDropdown("election_results", "#results_election", "#results_ballot_position", results_offices, "#results_ward", "#results_division", results_wards);

  geojson.removeFrom(results_map);
  geojson = L.geoJson(wards_polygon, {
    filter: mapAvailableWardsResults,
    onEachFeature: onEachFeature
  }).addTo(results_map);
  geojson.setStyle({
    color: '#28b78d'
  });
  highlightWard(results_wards, "#results_ward", results_map);
  updateChart(results_chart, 'results');
}

function choicesChange() {
  choices_divisions = setDivisionDropdown("num_selected", "#choices_election", "#choices_ballot_position", choices_offices, "#choices_ward", "#choices_division", choices_wards);

  geojson.removeFrom(choices_map);
  geojson = L.geoJson(wards_polygon, {
    filter: mapAvailableWardsChoices,
    onEachFeature: onEachFeature
  }).addTo(choices_map);

  highlightWard(choices_wards, "#choices_ward", choices_map);
  updateChart(choices_chart, 'choices');
}

function choicesOfficeChange() {
  $('#results_ward').empty();
  $('#choices_ward').empty();
  choices_wards = getWards_locations("num_selected", "#choices_election", "#choices_ballot_position", choices_offices);
  $.each(choices_wards, function(val, text) {
    $('#choices_ward').append(new Option(text, val));
  });
  choicesChange();
}

function choicesElectionChange() {
  choices_offices = setOffices("num_selected", "#choices_election", "#choices_ballot_position");
  $('#choices_ward').empty();
  choices_wards = getWards_locations("num_selected", "#choices_election", "#choices_ballot_position", choices_offices);


  $.each(choices_wards, function(val, text) {
    $('#choices_ward').append(new Option(text, val));
  });
  choicesChange();
}

function timeElectionChange() {

  $('#time_ward').empty();
  time_wards = getWards_locations("vote_time", "#time_election");

  geojson.removeFrom(time_map);
  geojson = L.geoJson(wards_polygon, {
    filter: mapAvailableWardsTime,
    onEachFeature: onEachFeature
  }).addTo(time_map);

  $.each(time_wards, function(val, text) {
    $('#time_ward').append(new Option(text, val));
  });
  timeChange();
}

function timeChange() {
  setDivisionDropdown("vote_time", "#time_election", "", "", "#time_ward", "#time_division", time_wards);
  highlightWard(time_wards, "#time_ward", time_map);
  graph = updateGraph();
}

function highlightWard(wards, wards_dropdown, map) {
  map_keys = _.keys(geojson._layers);
  ward = wards[$(wards_dropdown).val()];
  geojson.setStyle({
    color: '#1b9e77'
  });

  if (ward != "All") {
    polygon = _.filter(map_keys, function(key) {
      return geojson._layers[key].feature.properties.WARD_NUM == ward;
    });

    map._layers[polygon].bringToFront();
    map._layers[polygon].setStyle({
      color: '#d95f02'
    });
  }

}

function candCombElectionChange() {
  cand_comb_offices = setOffices("cand_comb", "#cand_comb_election", "#cand_comb_ballot_position");
  $('#cand_comb_ward').empty();
  cand_comb_wards = getWards_locations("cand_comb", "#cand_comb_election", "#cand_comb_ballot_position", cand_comb_offices);



  $.each(cand_comb_wards, function(val, text) {
    $('#cand_comb_ward').append(new Option(text, val));
  });

  candCombChange();
}

function candCombOfficeChange() {
  first_office_val = $("#cand_comb_ballot_position.chosen-select").val()[0];

  $('#cand_comb_ward').empty();
  cand_comb_wards = getWards_locations("cand_comb", "#cand_comb_election", "#cand_comb_ballot_position", cand_comb_offices);
  $.each(cand_comb_wards, function(val, text) {
    $('#cand_comb_ward').append(new Option(text, val));
  });
  if (cand_comb_wards === undefined) {
    $("#cand_comb_ballot_position.chosen-select").val(first_office_val).trigger('chosen:updated');
  }
  candCombChange();
}

function candCombChange() {
cand_comb_divisions = setDivisionDropdown("cand_comb", "#cand_comb_election", "#cand_comb_ballot_position", cand_comb_offices, "#cand_comb_ward", "#cand_comb_division", cand_comb_wards);

  geojson.removeFrom(cand_comb_map);
  geojson = L.geoJson(wards_polygon, {
    filter: mapAvailableWardsCond,
    onEachFeature: onEachFeature
  }).addTo(cand_comb_map);
  highlightWard(cand_comb_wards, "#cand_comb_ward", cand_comb_map);
  updateTable();
}
