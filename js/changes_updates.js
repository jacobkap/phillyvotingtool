function resultsElectionChange() {
  results_offices = setOffices("election_results", "#results_election", "#results_ballot_position");
  $('#results_ward').empty();
  results_wards = getWards("election_results", "#results_election", "#results_ballot_position", results_offices);
  $.each(results_wards, function(val, text) {
    $('#results_ward').append(new Option(text, val));
  });
  resultsChange();
}

function resultsOfficeChange() {
  $('#results_ward').empty();
  results_wards = getWards("election_results", "#results_election", "#results_ballot_position", results_offices);
  $.each(results_wards, function(val, text) {
    $('#results_ward').append(new Option(text, val));
  });
  resultsChange();
}

function resultsChange() {
  setDivisionDropdown("#results_ward", "#results_division", results_wards);
  updateChart(results_chart, 'results');
}

function choicesChange() {
  setDivisionDropdown("#choices_ward", "#choices_division", choices_wards);
  updateChart(choices_chart, 'choices');
}

function choicesOfficeChange() {
    $('#results_ward').empty();
    $('#choices_ward').empty();
    choices_wards = getWards("num_selected", "#choices_election", "#choices_ballot_position", choices_offices);
  $.each(choices_wards, function(val, text) {
        $('#choices_ward').append( new Option(text,val) );
    });
    choicesChange();
}

function choicesElectionChange() {
    choices_offices = setOffices("num_selected", "#choices_election", "#choices_ballot_position");
  $('#choices_ward').empty();
  choices_wards = getWards("num_selected", "#choices_election", "#choices_ballot_position", choices_offices);
$.each(choices_wards, function(val, text) {
      $('#choices_ward').append( new Option(text,val) );
  });
  choicesChange();
}

function timeElectionChange() {
  $('#time_ward').empty();
  time_wards = getWards("vote_time", "#time_election");
  $.each(time_wards, function(val, text) {
    $('#time_ward').append(new Option(text, val));
  });
  timeChange();
}

function timeChange() {
  setDivisionDropdown("#time_ward", "#time_division",time_wards);
  graph = updateGraph();
}

function candCombElectionChange() {
  cand_comb_offices = setOffices("cand_comb", "#cand_comb_election", "#cand_comb_ballot_position");
  $('#cand_comb_ward').empty();
  cand_comb_wards = getWards("cand_comb", "#cand_comb_election", "#cand_comb_ballot_position", cand_comb_offices);
  $.each(cand_comb_wards, function(val, text) {
            $('#cand_comb_ward').append( new Option(text,val) );
  });

  candCombChange();
}

function candCombOfficeChange() {
  $('#cand_comb_ward').empty();
  cand_comb_wards = getWards("cand_comb", "#cand_comb_election", "#cand_comb_ballot_position", cand_comb_offices);
  $.each(cand_comb_wards, function(val, text) {
            $('#cand_comb_ward').append( new Option(text,val) );
  });
  candCombChange();
}

function candCombChange() {
 cand_comb_division = setDivisionDropdown("#cand_comb_ward", "#cand_comb_division", cand_comb_wards);
  updateTable();
}
