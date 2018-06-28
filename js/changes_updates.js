function resultsElectionChange() {
  results_offices = setOffices("election_results", "#results_election", "#results_ballot_position");
  $('#results_ward').empty();
  results_wards = getWards("election_results", "#results_election", "#results_ballot_position", results_offices);
  $.each(results_wards, function(val, text) {
    $('#results_ward').append(new Option(text, val));
  });
  $('#results_ward').val(0);
  resultsChange();
}

function resultsOfficeChange() {
    $('#results_ward').empty();
  results_wards = getWards("election_results", "#results_election", "#results_ballot_position", results_offices);
  $.each(results_wards, function(val, text) {
    $('#results_ward').append(new Option(text, val));
  });
  $('#results_ward').val(0);
  resultsChange();
}

function choicesElectionChange() {
  choices_offices = setOffices("num_selected",
    "#choices_election",
    "#choices_ballot_position");
  choicesChange();
}

function resultsChange() {
  setDivisionDropdown("#results_ward", "#results_division");
  updateChart('results');
}

function choicesChange() {
  setDivisionDropdown("#choices_ward", "#choices_division");
  updateChart('choices');
}

function choicesElectionChange() {
  $('#choices_ward').empty();
  choices_wards = getWards("num_selected", "#choices_election", "#choices_ballot_position", choices_offices);
$.each(choices_wards, function(val, text) {
      $('#choices_ward').append( new Option(text,val) );
  });
  $('#choices_ward').val(0);
  choicesChange();
}

function timeElectionChange() {
  $('#time_ward').empty();
  time_wards = getWards("vote_time", "#time_election");
  $.each(time_wards, function(val, text) {
    $('#time_ward').append(new Option(text, val));
  });
  $('#time_ward').val(0);
  timeChange();
}

function timeChange() {
  setDivisionDropdown("#time_ward", "#time_division");
  graph = updateGraph();
}
