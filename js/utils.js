function readCSV(csv) {
  var result = null;
  var scriptUrl = csv;
  $.ajax({
    url: scriptUrl,
    type: 'get',
    dataType: 'text',
    async: false,
    success: function(data) {
      result = data;
    }
  });
  return result;
}

function data_object_fun(arr, headers) {
  headers = headers.split(",");
  var jsonObj = [];
  for (var i = 0; i < arr.length; i++) {
    temp = arr[i];
    data = temp.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    var obj = {};
    for (var j = 0; j < data.length; j++) {
      obj[headers[j]] = data[j];
    }
    jsonObj.push(obj);
  }
  return (jsonObj);
}

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

function setDivisionDropdown(type, election_dropdown, office_dropdown, offices, ward_dropdown, division_dropdown, wards) {
  $(division_dropdown).empty();
  divisions = ["All"];
  ward_num = wards[$(ward_dropdown).val()];

  if (ward_num != "All") {
    /*
    division_num = _.filter(max_divisions, function(x) {
      return x.ward == ward_num;
    });
    division_num = division_num[0].max_division;
    for (var i = 1; i < division_num + 1; i++) {
      divisions.push(i);
    }
  }
  */
  locations = getWards_locations(type, election_dropdown, office_dropdown, offices, wards = false);
  divisions = [];
  for (var i = 0; i < locations.length; i++) {
    if (locations[i].replace(/-.*/, "") === ward_num) {
      temp = locations[i];
      temp = temp.replace(/.*-/, "");
      temp = parseInt(temp);
      divisions.push(temp);
    }
  }
  divisions = divisions.sort(function(a,b) { return a - b; });
   divisions.unshift("All");
}
  $.each(divisions, function(val, text) {
    $(division_dropdown).append(new Option(text, val));
  });
  $(division_dropdown).val(0);
  $('.simple-select').chosen();
  $('.simple-select').trigger('chosen:updated');
  return divisions;
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

  election = elections[$(election_dropdown).val()];

  if (type == "cand_comb") {
    election = elections_no_special[$(election_dropdown).val()];
  }

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
    elections = elections;
  } else if (type == "cand_comb") {
    folder = "cand_comb";
    office_dropdown = "#cand_comb_ballot_position";
    election_dropdown = "#cand_comb_election";
    elections = elections_no_special;
  }

  office_options = getOffices(folder, election_dropdown);
  election = elections[$(election_dropdown).val()];
  election = election.toLowerCase().replace(" ", "_");
  election = election.replace(" ", "_");
  url = "https://raw.githubusercontent.com/jacobkap/phillyvotingtool/master/data/";
  url += folder + "/election_";
  url += election + "/";
  url += folder + "_";
  temp_office = $(office_dropdown).val();
  if (Array.isArray(temp_office)) {
  selected_office = office_options[temp_office[0]];
} else {
  selected_office = office_options[temp_office];
}
  if (Array.isArray(temp_office) && $(office_dropdown).val().length > 1) {
    temp_office = $(office_dropdown).val();
    temp_office = office_options[temp_office[1]];
    selected_office += " " + temp_office;
  }
  url += selected_office;

if (type == "cand_comb") {
  url += "_ward_" + cand_comb_wards[$("#cand_comb_ward").val()];
  url += ".csv";
    data_type = "csv";
} else if (type == "results") {
  url += "_ward_" + results_wards[$("#results_ward").val()];
  url += ".json";
    data_type = "json";
} else if (type == "choices") {
  url += "_ward_" + choices_wards[$("#choices_ward").val()];
  url += ".json";
  data_type = "json";
}

  var data = $.getJSON({
    url: url,
    type: 'get',
    dataType: data_type,
    async: false,
    success: function(data) {
      result = data;
    }
  });
  if (type == "cand_comb") {
    data = data.responseText;
  } else {
  data = data.responseJSON;
}
  return (data);
}



function getWards_locations(type, election_dropdown, office_dropdown, offices, wards = true) {

  election = elections[$(election_dropdown).val()];
  if (type == "cand_comb") {
      election = elections_no_special[$(election_dropdown).val()];
  }
  election = election.toLowerCase().replace(" ", "_");
  election = election.replace(" ", "_");
  url = "https://raw.githubusercontent.com/jacobkap/phillyvotingtool/master/data/";
  url += type + "/election_" + election + "/";
  office = "";
  if (type == "cand_comb") {
    office = "_" + offices[$(office_dropdown).val()[0]];
    if ($(office_dropdown).val().length > 1) {
      office += " " + offices[$(office_dropdown).val()[1]];
    }
  } else if (type == "election_results" || type == "num_selected") {
    office = "_" + offices[$(office_dropdown).val()];
  }

  if (wards === true) {
    ward_or_location = "wards";
  } else {
    ward_or_location = "locations";
  }
  url += ward_or_location + office + ".json";

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


function mapAvailableWardsTime(feature) {return mapAvailableWards(feature, time_wards);}
function mapAvailableWardsResults(feature) {return mapAvailableWards(feature, results_wards);}
function mapAvailableWardsChoices(feature) {return mapAvailableWards(feature, choices_wards);}
function mapAvailableWardsCond(feature) {return mapAvailableWards(feature, cand_comb_wards);}
function mapAvailableWards(feature, wards) {
  // Check if polygon ward is in available wards
  if (wards.indexOf(feature.properties.WARD_NUM) != -1) {
    return true;
  }
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
    division = results_divisions[$("#results_division").val()];
    division_section = 2;
  } else if (type == "choices") {
    division = choices_divisions[$("#choices_division").val()];
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

function subsetGraphData(data, type = "votes") {
  var final_data = [];
  division = $("#time_division").val();
  if (division === "0") {
    division = "All";
  }
  data_column = 2;
  if ($("#vote_numbers").is(':checked')) {
    data_column = 1;
  }

  if (type == "time") {
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
    election = elections[$(results_election).val()];
    title = "  " + election + " Election, " + results_offices[$('#results_ballot_position').val()];
    if (results_wards[$("#results_ward").val()] != "All") {
      title += ", Ward " + results_wards[$("#results_ward").val()];
      if ($("#results_division").val() != "0") {
        title += ", Division " + results_divisions[$("#results_division").val()];
      }
      title_text = [title];

    }
    title_text = [title];
  } else if (type == "choices") {
    election = elections[$(choices_election).val()];
    title = election + " Election, " + choices_offices[$('#choices_ballot_position').val()];
    if (choices_wards[$("#choices_ward").val()] != "All") {
      title += ", Ward " + choices_wards[$("#choices_ward").val()];
    }
    if ($("#choices_division").val() != "0") {
      title += ", Division " + choices_divisions[$("#choices_division").val()];
    }
    title += "  ";
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

function makeMap(map_div) {
  var map = L.map(map_div, {
    minZoom: 10
  }).setView([40, -75.1], 10);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiamtrYXBsYW4iLCJhIjoiY2lnOXAyaWZyMHNjZ3V5bHg4YTZieDczaSJ9.vSjaF4o2xaDFhNAv9Z2y7A'
  }).addTo(map);
  bound1 = L.latLng(39.85388374694184, -75.38818359375);
  bound2 = L.latLng(40.212440718286466, -74.8828125);
  max_bounds = L.latLngBounds(bound1, bound2);
  map.setMaxBounds(max_bounds);
  return map;
}

function dropdownFun() {
    document.getElementById("myDropdown").classList.toggle("show");
}
