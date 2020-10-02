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

  // array of moment objects for each hour of the work day
  var hours = [];

  // grabs the hour of the current time for comparison to the times in the array
  var timeHour = moment();

  // object array to save scheduled items
  var savedSchedule = [];

  var storedSchedule = JSON.parse(localStorage.getItem("schedule"));

  // FUNCTION DEFINITIONS

  // function populates the array used to store hours of work
  function workHours() {
    for (var i = 9; i < 18; i++) {
      hours.push(moment({ hour: i }));
    }
  }

  // sets the current day and date to the page
  function populateDate() {
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

      // sets the bg color of the current hour time block to red
      if (hours[i].isSame(timeHour, "hour")) {
        var descriptionDivEl = $("<textarea>").attr(
          "class",
          "col-10 description present"
        );
        descriptionDivEl.attr("id", i);
        //descriptionDivEl.text("Testing " + i);
      } // checks for hours that have passed and sets bg color to grey
      else if (hours[i].isBefore(timeHour, "hour")) {
        var descriptionDivEl = $("<textarea>").attr(
          "class",
          "col-10 description past"
        );
        descriptionDivEl.attr("id", i);
        //descriptionDivEl.text("Testing " + i);
      } // hours in the future are set to green
      else {
        var descriptionDivEl = $("<textarea>").attr(
          "class",
          "col-10 description future"
        );
        descriptionDivEl.attr("id", i);
        //descriptionDivEl.text("Testing " + i);
      }

      // populate saved schedule information

      console.log(descriptionDivEl.attr("id"));
      //console.log(Number.parseInt(storedSchedule[1].index));
      console.log(i);
      for (var x = 0; x < storedSchedule.length; x++) {
        if (descriptionDivEl.attr("id") === storedSchedule[x].index) {
          console.log("match");
          descriptionDivEl.val(storedSchedule[x].text);
        }
      }

      var saveBtn = $("<button>").attr("class", "saveBtn fas fa-save col-1");

      // formats and sets time text to the time slot
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
  function populateSchedule() {
    var storedSchedule = JSON.parse(localStorage.getItem("schedule"));
    console.log(storedSchedule);
    if (storedSchedule !== null) {
      for (var i = 0; i < hours.length; i++) {
        //console.log(storedSchedule[i]);
        var descriptionId = descriptionDivEl.attr("id");
        console.log(descriptionId + " " + i);
        descriptionDivEl.html("test");
      }
    }
  }
  function saveActivity(target) {
    //console.log("testing");
    var element = target.prev(".description");
    var textInfo = element.val();
    var index = element.attr("id");
    console.log("saved " + textInfo + " " + index);

    savedSchedule.push({ index: index, text: textInfo });
    localStorage.setItem("schedule", JSON.stringify(savedSchedule));

    //   scoreArray.push({ name: initials, score: finalScore });
    // localStorage.setItem("userScores", JSON.stringify(scoreArray));
  }
  // FUNCTION CALLS
  populateDate();
  workHours();
  populateTimeBlocks();
  //populateSchedule();

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

  $(".saveBtn").on("click", function () {
    //console.log(value);
    //event.preventDefault();
    //console.log("testing");
    saveActivity($(this));
  });
});
