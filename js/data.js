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
mult_offices = _.map(multiple_choices_offices, function(x){ return x.office; });
// multiple_choices_offices =
