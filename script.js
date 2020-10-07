$(document).ready(function () {
  // DOM VARIABLES

  // targets the paragraph element for the current day and date
  var currentDay = $("#currentDay");

  // JS VARIABLES

  // array of moment objects for each hour of the work day
  var hours = [];

  // grabs the hour of the current time for comparison to the times in the array
  var timeHour = moment();

  // object array to save scheduled items
  var storedSchedule = JSON.parse(localStorage.getItem("schedule")) || [];

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

  // sets the colors of the time blocks based on the current time
  function setBlockColors(index, element) {
    // sets the bg color of the current hour time block to red
    if (hours[index].isSame(timeHour, "hour")) {
      element.addClass("present");
    } // checks for hours that have passed and sets bg color to grey
    else if (hours[index].isBefore(timeHour, "hour")) {
      element.addClass("past");
    } // hours in the future are set to green
    else {
      element.addClass("future");
    }
  }
  // populates page with the time blocks
  function populateTimeBlocks() {
    for (var i = 0; i < hours.length; i++) {
      var containerEl = $(".container");
      var rowDivEl = $("<div>").attr("class", "row time-block");

      var timeDivEl = $("<div>").attr("class", "col-1 hour pt-2 text-right");

      var descriptionDivEl = $("<textarea>").attr(
        "class",
        "col-10 description"
      );
      descriptionDivEl.attr("data-index", i);

      // populate saved schedule information
      for (var x = 0; x < storedSchedule.length; x++) {
        if (descriptionDivEl.attr("data-index") === storedSchedule[x].index) {
          descriptionDivEl.val(storedSchedule[x].text);
        }
      }

      // creates the save button and sets the attributes
      var saveBtn = $("<button>").attr("class", "saveBtn fas fa-save col-1");

      // formats and sets time text to the time slot
      var displayTime = hours[i].format("hA");
      timeDivEl.text(displayTime);

      // adds time slot, description, and save button to row
      rowDivEl.append(timeDivEl, descriptionDivEl, saveBtn);

      // adds row content to main container
      containerEl.append(rowDivEl);

      // calls function to set the proper colors based on the current time
      setBlockColors(i, descriptionDivEl);
    }
  }

  // update object array to ensure changed description gets changed at the correct index where old description was at
  function saveActivity(target) {
    //console.log(storedSchedule);
    var element = target.prev(".description");
    var textInfo = element.val();
    var ind = element.attr("data-index");

    // finds the index of the selected attribute data-index in the storedSchedule array
    var objectIndex = storedSchedule
      .map(function (par) {
        return par.index;
      })
      .indexOf(ind);

    // if the attribute data-index already exists in the storeSchedule array, the new information will overwrite the old information
    if (objectIndex !== -1) {
      storedSchedule[objectIndex] = { index: ind, text: textInfo };
    } else {
      // if the is no saved information with the selected attribute data-index, a new object with the data-index and text will be added to the array
      storedSchedule.push({ index: ind, text: textInfo });
    }
    localStorage.setItem("schedule", JSON.stringify(storedSchedule));
  }
  // FUNCTION CALLS
  populateDate();
  workHours();
  populateTimeBlocks();

  // EVENT LISTENERS

  // saves the activity of the save button that was clicked to local storage
  $(".saveBtn").on("click", function () {
    saveActivity($(this));
  });
});
