elections = [
  "2018 General",
  "2018 Primary",
  "2017 General",
  "2017 Primary",
  "2017 March Special",
  "2016 General",
  "2016 Primary",
  "2016 March Special",
  "2015 General",
  "2015 Primary",
  "2015 August Special",
  "2015 March Special",
  "2014 General",
  "2014 Primary",
  "2013 General",
  "2013 Primary",
  "2012 General",
  "2012 Primary"
];

elections_no_special = [
  "2018 General",
  "2018 Primary",
  "2017 General",
  "2017 Primary",
  "2016 General",
  "2016 Primary",
  "2015 General",
  "2015 Primary",
  "2014 General",
  "2014 Primary",
  "2013 General",
  "2013 Primary",
  "2012 General",
  "2012 Primary"
];


/*
wards = [
"All",
1, 2, 3, 4, 5, 6, 7, 8, 9,
10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
60, 61, 62, 63, 64, 65, 66
];
*/

all_offices = [
 "City Controller - Democrat" ,
 "City Controller - Republican",
 "District Attorney - Democrat",
 "District Attorney - Republican",
 "Judge of the Commonwealth Court - Democrat",
 "Judge of the Commonwealth Court - Republican",
 "Judge of the Court of Common Pleas - Democrat",
 "Judge of the Court of Common Pleas - Republican",
 "Judge of the Municipal Court - Democrat",
 "Judge of the Municipal Court - Republican",
 "Judge of the Superior Court - Democrat",
 "Judge of the Superior Court - Republican",
 "Justice of the Supreme Court - Democrat",
 "Justice of the Supreme Court - Republican",
 "Proposed Charter Change Question #1",
 "Proposed Charter Change Question #2"
];

max_divisions = [
  {
    "ward": 1,
    "max_division": 21
  },
  {
    "ward": 2,
    "max_division": 27
  },
  {
    "ward": 3,
    "max_division": 22
  },
  {
    "ward": 4,
    "max_division": 21
  },
  {
    "ward": 5,
    "max_division": 29
  },
  {
    "ward": 6,
    "max_division": 18
  },
  {
    "ward": 7,
    "max_division": 23
  },
  {
    "ward": 8,
    "max_division": 30
  },
  {
    "ward": 9,
    "max_division": 17
  },
  {
    "ward": 10,
    "max_division": 29
  },
  {
    "ward": 11,
    "max_division": 20
  },
  {
    "ward": 12,
    "max_division": 24
  },
  {
    "ward": 13,
    "max_division": 25
  },
  {
    "ward": 14,
    "max_division": 11
  },
  {
    "ward": 15,
    "max_division": 19
  },
  {
    "ward": 16,
    "max_division": 18
  },
  {
    "ward": 17,
    "max_division": 29
  },
  {
    "ward": 18,
    "max_division": 17
  },
  {
    "ward": 19,
    "max_division": 19
  },
  {
    "ward": 20,
    "max_division": 11
  },
  {
    "ward": 21,
    "max_division": 45
  },
  {
    "ward": 22,
    "max_division": 29
  },
  {
    "ward": 23,
    "max_division": 23
  },
  {
    "ward": 24,
    "max_division": 19
  },
  {
    "ward": 25,
    "max_division": 24
  },
  {
    "ward": 26,
    "max_division": 24
  },
  {
    "ward": 27,
    "max_division": 23
  },
  {
    "ward": 28,
    "max_division": 18
  },
  {
    "ward": 29,
    "max_division": 18
  },
  {
    "ward": 30,
    "max_division": 17
  },
  {
    "ward": 31,
    "max_division": 19
  },
  {
    "ward": 32,
    "max_division": 31
  },
  {
    "ward": 33,
    "max_division": 24
  },
  {
    "ward": 34,
    "max_division": 42
  },
  {
    "ward": 35,
    "max_division": 32
  },
  {
    "ward": 36,
    "max_division": 41
  },
  {
    "ward": 37,
    "max_division": 21
  },
  {
    "ward": 38,
    "max_division": 21
  },
  {
    "ward": 39,
    "max_division": 46
  },
  {
    "ward": 40,
    "max_division": 51
  },
  {
    "ward": 41,
    "max_division": 26
  },
  {
    "ward": 42,
    "max_division": 25
  },
  {
    "ward": 43,
    "max_division": 25
  },
  {
    "ward": 44,
    "max_division": 19
  },
  {
    "ward": 45,
    "max_division": 25
  },
  {
    "ward": 46,
    "max_division": 23
  },
  {
    "ward": 47,
    "max_division": 14
  },
  {
    "ward": 48,
    "max_division": 23
  },
  {
    "ward": 49,
    "max_division": 22
  },
  {
    "ward": 50,
    "max_division": 30
  },
  {
    "ward": 51,
    "max_division": 28
  },
  {
    "ward": 52,
    "max_division": 28
  },
  {
    "ward": 53,
    "max_division": 23
  },
  {
    "ward": 54,
    "max_division": 22
  },
  {
    "ward": 55,
    "max_division": 29
  },
  {
    "ward": 56,
    "max_division": 41
  },
  {
    "ward": 57,
    "max_division": 28
  },
  {
    "ward": 58,
    "max_division": 44
  },
  {
    "ward": 59,
    "max_division": 25
  },
  {
    "ward": 60,
    "max_division": 23
  },
  {
    "ward": 61,
    "max_division": 28
  },
  {
    "ward": 62,
    "max_division": 26
  },
  {
    "ward": 63,
    "max_division": 25
  },
  {
    "ward": 64,
    "max_division": 18
  },
  {
    "ward": 65,
    "max_division": 23
  },
  {
    "ward": 66,
    "max_division": 46
  }
];

multiple_choices_offices = [
  {
    "office": "Judge of the Superior Court - Democrat",
    "max_choices": 4
  },
  {
    "office": "Judge of the Commonwealth Court - Democrat",
    "max_choices": 2
  },
  {
    "office": "Judge of the Court of Common Pleas - Democrat",
    "max_choices": 9
  },
  {
    "office": "Judge of the Municipal Court - Democrat",
    "max_choices": 2
  },
  {
    "office": "Judge of the Superior Court - Republican",
    "max_choices": 4
  },
  {
    "office": "Judge of the Commonwealth Court - Republican",
    "max_choices": 2
  }
];
// mult_offices = _.map(multiple_choices_offices, function(x){ return x.office; });
// mult_offices_choices = _.map(multiple_choices_offices, function(x){ return x.max_choices; });



title_text = ["temp", "temp2"];
results_options = {
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
};

choices_options = {
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
        max: 100,
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
        return ' % who voted for ' + tooltipItems.xLabel + " choices:" + tooltipItems.yLabel;
      }
    }
  }
};
