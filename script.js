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
  // var timeArray = [
  //   "9AM",
  //   "10AM",
  //   "11AM",
  //   "12PM",
  //   "1PM",
  //   "2PM",
  //   "3PM",
  //   "4PM",
  //   "5PM",
  // ];

  // array of moment objects for each hour of the work day
  var hours = [];
  function workHours() {
    for (var i = 9; i < 18; i++) {
      hours.push(moment({ hour: i }));
      console.log(hours);
    }
    console.log(hours.length);
    //var momentObj = moment({ hour: 9 });
    console.log("hours " + hours[1].format("hA"));
  }
  // for (var i = 0; i < momentObj.length; i++) {

  // }

  // grabs the hour of the current time for comparison to the times in the array --- temporary set to 11 for comparison
  var timeHour = moment({ hours: 11 });
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
    for (var i = 0; i < hours.length; i++) {
      var containerEl = $(".container");
      var rowDivEl = $("<div>").attr("class", "row time-block");
      // potentially move spacing and text location to css file
      var timeDivEl = $("<div>").attr("class", "col-1 hour pt-2 text-right");

      console.log(hours[0]);
      // will need to add past/present/future class based on time of day

      // sets the bg color of the current time block to red
      if (hours[i].isSame(timeHour)) {
        var descriptionDivEl = $("<textarea>").attr(
          "class",
          "col-10 description present"
        );
      } // checks for hours that have passed and sets bg color to grey
      else if (hours[i].isBefore(timeHour)) {
        var descriptionDivEl = $("<textarea>").attr(
          "class",
          "col-10 description past"
        );
      } // hours in the future are set to green
      else {
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
      var displayTime = hours[i].format("hA");
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
  workHours();
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
