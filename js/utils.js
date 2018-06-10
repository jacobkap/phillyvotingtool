function getData(type) {
  folder = "election_results/election_results_";
  if (type == "choices") {
    folder = "num_selected/num_selected_";
  }

  url = "https://raw.githubusercontent.com/jacobkap/phillyvotingtool/master/data/";
  url += folder;
  url += all_offices[$('#results_ballot_position').val()];
  url += "_ward_" + wards[$('#results_ward').val()];
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

function formatData(data) {
  var formatted_data = {
    labels: data[0],
    datasets: [{
      data: data[1],
      backgroundColor: 'rgb(105,105,105)',
      label: all_offices[$('#results_ballot_position').val()]
    }]
  };
  return formatted_data;
}



function updateChart(type) {

  var data = getData();
  data = formatData(data);

chart_type = "horizontalBar";
  chart_div = ctx_results;
  if (type == "choices") {
   chart_div = ctx_c;
   chart_type = "bar";
 }



  var resultsChart = new Chart(chart_div, {
    type: chart_type,
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
