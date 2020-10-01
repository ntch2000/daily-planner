$(document).ready(function () {
  console.log("hello world");
  // DOM VARIABLES

  var containerEl = $(".container");
  var rowDivEl = $("<div>").attr("class", "row");
  // potentially move spacing and text location to css file
  var timeDivEl = $("<div>").attr("class", "col-1 hour pt-1 text-right");

  // will need to add past/present/future class based on time of day
  var descriptionDivEl = $("<textarea>").attr(
    "class",
    "col-11 time-block description past"
  );

  // targets the paragraph element for the current day and date
  var currentDay = $("#currentDay");

  // JS VARIABLES

  // temp array of times to populate workday
  var timeArray = [
    "9AM",
    "10AM",
    "11AM",
    "12AM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
  ];
  // FUNCTION DEFINITIONS
  function populateDate() {
    // sets current day and date
    currentDay.text(
      moment().format("dddd") + ", " + moment().format("MMMM Do")
    );
  }
  // populates page with the time blocks
  function populateTimeBlocks() {
    for (var i = 0; i < timeArray.length; i++) {
      var containerEl = $(".container");
      var rowDivEl = $("<div>").attr("class", "row time-block");
      // potentially move spacing and text location to css file
      var timeDivEl = $("<div>").attr("class", "col-1 hour pt-2 text-right");

      // will need to add past/present/future class based on time of day
      var descriptionDivEl = $("<textarea>").attr(
        "class",
        "col-10 description past"
      );

      var saveBtn = $("<button>").attr("class", "saveBtn fas fa-save col-1");

      // sets time text to the time slot
      timeDivEl.text(timeArray[i]);

      // adds time slot to row
      rowDivEl.append(timeDivEl);

      // adds description slot to row
      rowDivEl.append(descriptionDivEl);

      // adds save button to row
      rowDivEl.append(saveBtn);

      // adds row content to main container
      containerEl.append(rowDivEl);
    }
  }
  // FUNCTION CALLS
  populateDate();
  populateTimeBlocks();
  // EVENT LISTENERS
});
