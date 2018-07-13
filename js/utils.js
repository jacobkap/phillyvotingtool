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

function setDivisionDropdown(ward_dropdown, division_dropdown, wards) {
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

  return temp_division;
}

function setOffices(type, election_dropdown, ballot_dropdown) {
  offices = getOffices(type, election_dropdown);

  $(ballot_dropdown).empty();
  $.each(offices, function(val, text) {
    $(ballot_dropdown).append(new Option(text, val));
  });
  $(ballot_dropdown).val(0);
  $(ballot_dropdown).trigger("chosen:updated");
  return (offices);

}

function getOffices(type, election_dropdown, max_choices = false) {
  if (type == "results") {
   type = "election_results";
 }
  url = "https://raw.githubusercontent.com/jacobkap/phillyvotingtool/master/data/";
  url += type + "/election_";
  if (type == "num_selected") {
    elections = num_selected_elections;
  }

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
  data.sort();
  if (type == "num_selected") {
    data = _.map(data, function(x) {
      if (max_choices === false) {
        return x.category;
      } else {
        return x.max_choices;
      }
    });
  }
  return (data);
}

function getData(type) {
  if (type == "results") {
    folder = "election_results";
    office_dropdown = "#results_ballot_position";
    election_dropdown = "#results_election";
  } else if (type == "choices") {
    folder = "num_selected";
    office_dropdown = "#choices_ballot_position";
    election_dropdown = "#choices_election";
    elections = num_selected_elections;
  } else if (type == "cand_comb") {
    folder = "cand_comb";
    office_dropdown = "#cand_comb_ballot_position";
    election_dropdown = "#cand_comb_election";
    elections = elections;
  }

  office_options = getOffices(folder, election_dropdown);
  election = elections[$(election_dropdown).val()];
  election = election.toLowerCase().replace(" ", "_");
  election = election.replace(" ", "_");
  url = "https://raw.githubusercontent.com/jacobkap/phillyvotingtool/master/data/";
  url += folder + "/election_";
  url += election + "/";
  url += folder + "_";
  url += office_options[$(office_dropdown).val()];

if (type == "cand_comb") {
  url += "_ward_" + cand_comb_wards[$("#cand_comb_ward").val()];
} else if (type == "results") {
  url += "_ward_" + results_wards[$("#results_ward").val()];
} else if (type == "choices") {
  url += "_ward_" + choices_wards[$("#choices_ward").val()];
}
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



function getWards(type, election_dropdown, office_dropdown, offices) {
  if (type == "num_selected") {
    elections = num_selected_elections;
  }
  election = elections[$(election_dropdown).val()];
  election = election.toLowerCase().replace(" ", "_");
  election = election.replace(" ", "_");
  url = "https://raw.githubusercontent.com/jacobkap/phillyvotingtool/master/data/";
  url += type + "/election_" + election + "/";
  office = "";
  if (type != "vote_time") {
    office = "_" + offices[$(office_dropdown).val()];
  }
  url += "wards" + office + ".json";

  data = $.getJSON({
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
  election = election.replace(" ", "_");
  url += election + "/election_" + election + "_ward_";
  url += time_wards[$("#time_ward").val()];
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

function subsetData(data, type) {
  var final_data = [];
  if (type == "results") {
    division = $("#results_division").val();
    division_section = 2;
  } else if (type == "choices") {
    division = $("#choices_division").val();
    division_section = 1;
  }
  if (division === "0") {
    division = "All";
  }

  for (var i = 0; i < data[0].length; i++) {
    if (data[division_section][i] == division) {
      if (type == "results") {
        temp = [data[0][i], data[1][i]];
      } else if (type == "choices") {
        temp = [data[0][i], data[2][i]];
      }
      final_data.push(temp);
    }
  }
  return final_data;
}

function subsetGraphData(data) {
  var final_data = [];
  division = $("#time_division").val();
  if (division === "0") {
    division = "All";
  }
  data_column = 2;
  if ($("#cum_sum").is(':checked')) {
    data_column = 4;
  }

  for (var i = 0; i < data[0].length; i++) {
    if (data[3][i] == division) {
      final_data.push(parseFloat(data[data_column][i]));
    }
  }
  return final_data;
}

function formatData(data, type) {

  // Default to results type
  if (type == "results") {
    title = results_offices[$('#results_ballot_position').val()];
    if (results_wards[$("#results_ward").val()] != "All") {
      title += ", Ward " + results_wards[$("#results_ward").val()];
      if ($("#results_division").val() != "0") {
        title += ", Division " + $("#results_division").val();
      }
      title_text = [title];

    }
    title_text = [title];
  } else if (type == "choices") {
    title = choices_offices[$('#choices_ballot_position').val()];
    if (choices_wards[$("#choices_ward").val()] != "All") {
      title += ", Ward " + choices_wards[$("#choices_ward").val()];
    }
    if ($("#choices_division").val() != "0") {
      title += ", Division " + $("#choices_division").val();
    }
    choices_max = getOffices("num_selected", "#choices_election", true);
    subtitle = "Max number of selections: " + choices_max[$('#choices_ballot_position').val()];
    title_text = [title, subtitle];
  }



  var formatted_data = {
    labels: _.map(data, function(x) {
      return x[0];
    }),
    datasets: [{
      data: _.map(data, function(x) {
        return x[1];
      }),
      backgroundColor: 'rgb(105,105,105)',
    }]
  };
  return [formatted_data, title_text];
}
