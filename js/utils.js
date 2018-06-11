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



function formatData(data, type) {

  // Default to results type
  title = all_offices[$('#results_ballot_position').val()];
  if (wards[$("#results_ward").val()] != "All") {
    title += ", Ward " + wards[$("#results_ward").val()];
  }

  if (type == "choices") {
    title = mult_offices[$('#choices_ballot_position').val()];
    if (wards[$("#choices_ward").val()] != "All") {
      title += ", Ward " + wards[$("#choices_ward").val()];
    }
  }


  var formatted_data = {
    labels: data[0],
    datasets: [{
      data: data[1],
      backgroundColor: 'rgb(105,105,105)',
    }]
  };
  return formatted_data;
}



function updateChart(type) {

  data = getData(type);
  data = formatData(data, type);

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
          }]
        },
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function(tooltipItems, data) {
              return ' % who voted for ' + tooltipItems.xLabel + " choices: " + tooltipItems.yLabel + "%";
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

            $(ward_dropdown).val(ward_num);
            $(ward_dropdown).trigger("chosen:updated");
            updateChart(update_type);
          }


          function onEachFeature(feature, layer) {
              //bind click
              layer.on({
                  click: whenClicked
              });
          }
