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
    "col-10 description past"
  );

  // targets the paragraph element for the current day and date
  var currentDay = $("#currentDay");

  // JS VARIABLES

  // temp array of times to populate workday
  var timeArray = [
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
  ];

  // grabs the hour of the current time and formats it to the  proper format for comparison to the times in the array
  var timeHour = moment().format("hA");
  console.log(timeHour);

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

      console.log(timeArray[0]);
      // will need to add past/present/future class based on time of day
      // sets the bg color of the current time block to red
      if (timeArray[i] === timeHour) {
        var descriptionDivEl = $("<textarea>").attr(
          "class",
          "col-10 description present"
        );
      } else if (timeArray[i] < timeHour) {
        var descriptionDivEl = $("<textarea>").attr(
          "class",
          "col-10 description past"
        );
      } else {
        // if time is less than current time make past
        // if time is current time make present
        // if time is greater than current time make future
        var descriptionDivEl = $("<textarea>").attr(
          "class",
          "col-10 description future"
        );
      }
      var saveBtn = $("<button>").attr("class", "saveBtn fas fa-save col-1");

      // sets time text to the time slot
      var displayTime = timeArray[i];
      timeDivEl.text(displayTime);

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

  // var m = moment();
  // console.log("test moment stuff");
  // console.log(m.toString());
  // console.log(m.hour() + " " + m.minute());
  // console.log(
  //   moment("2019-06-04 14:00:00").isSame("2019-06-04 14:00:00", "hour")
  // );
  // var readable = m.format("hA");
  // console.log(readable);
  // console.log(timeArray[3]);
  // EVENT LISTENERS
});
