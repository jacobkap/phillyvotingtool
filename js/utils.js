function getData() {

  url = "https://raw.githubusercontent.com/jacobkap/phillyvotingtool/master/data/election_results/election_results_";
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



function updateChart() {

  var z = getData();
  var data = formatData(z);

  var resultsChart = new Chart(ctx, {
    type: 'horizontalBar',
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
