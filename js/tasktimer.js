/*Task Timer App*/
"use strict";

// Global variables
//const numberRegEx = /^[0-9]+$/;
const numberRegEx = /^\d+$/;
let hours;
let minutes;
let seconds;
let timerInterval;

/**
 * Function that handle the elements that will be affected if there's an error.
 * @param {*} error Boolean to detect if theres an error or no.
 * @param {*} errorText Errot text to show.
 */
const handleErrorsInputAdd = (error, errorText) => {
	const errorElement = $("#addtime");
	$(errorElement).next().text(errorText);
	if ($(errorElement).next().hasClass("hide") && error) {
		// Show error element
		$(errorElement).next().removeClass("hide");
	} else if (!$(errorElement).hasClass("hide") && !error) {
		// Hide error element
		$(errorElement).next().addClass("hide");
	}
};

/**
 * Function that calculate the current day and add it to a label.
 */
const currentDay = () => {
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let currentDate = new Date();
	var currentDayOfWeek = currentDate.getDay();
	var currentDayName = daysOfWeek[currentDayOfWeek];

	$("#currentDaySalute").text(currentDayName);
};

/**
 * Function that adds a leading zero to single digits using a string method.
 * @param {*} num
 * @returns
 */
const padSingleDigit = (num) => num.toString().padStart(2, "0");

/**
 * Function that gte the user's entry, validate it, then hide the set section,
 * show the timer section and call the function to set the timer.
 */
const startTimer = () => {
	const task = $('#addtask input[type="text"]').val().trim();
	const time = $('#addtime input[type="text"]').val().trim();
	if (task.length == 0 || time.length == 0) {
		handleErrorsInputAdd(
			true,
			"You must enter a task and a time, please check."
		);
	} else if (!numberRegEx.test(time)) {
		handleErrorsInputAdd(
			true,
			"The time must be a number without decimals, please check."
		);
	} else {
		// We get if the user choose minutes or hours.
		const timeOptionSelected = $("input[name='timeoption']:checked").val();
		// Reset errors
		handleErrorsInputAdd(false, "");
		// Hide the set section, show the timer section and call the function to set the timer.
		$("#inputContainer").animate({ opacity: 0, width: "-=100%" }, 1000, () => {
			$("#inputContainer").toggleClass("hide");
			$("#inputContainer").css({ opacity: "", width: "" });
			$("#timer").animate({ opacity: 0 }, 0, () => {
				$("#timer").animate({ opacity: 1 }, 1000);
				$("#timer").toggleClass("hide");
				$("#timer label").text(task);
				setTimer(timeOptionSelected, time);
			});
		});
	}
};

/**
 * Function that set the time to display and then start the timer.
 */
const setTimer = (timeOptionSelected, time) => {
	hours = 0;
	minutes = 0;
	seconds = 0;

	// Validate if the time option is minutes or hours.
	if (timeOptionSelected == "minutes") {
		minutes = time;
		if (time > 60) {
			hours = time / 60;
			hours = hours.toFixed(0);
			minutes = time % 60;
		}
	} else {
		hours = time;
	}

	// Update the time in the html window
	assingTime(hours, minutes, seconds);
	// Start the timer
	timerInterval = setInterval(timer, 1000);
};

/**
 * Function that manage the time to display.
 */
const timer = () => {
	let end = false;

	// Validate if the time ends to call the times over section.
	if (minutes == 0 && hours == 0 && seconds == 0) {
		end = true;
		startTimesOver();
	}

	// If time hasn't ended we update the time
	if (!end) {
		if (seconds == 0 && minutes == 0 && hours >= 1) {
			hours--;
		}
		if (seconds == 0) {
			minutes--;
		}
		seconds--;
		if (seconds < 0) {
			seconds = 59;
		}
		if (minutes < 0) {
			minutes = 59;
		}
	}
	// Update the time in the html window
	assingTime(hours, minutes, seconds);
};

/**
 * Function that assign the time values in the html window.
 * @param {*} hour
 * @param {*} minute
 * @param {*} second
 */
const assingTime = (hours, minutes, seconds) => {
	$("#hours").text(padSingleDigit(hours));
	$("#minutes").text(padSingleDigit(minutes));
	$("#seconds").text(padSingleDigit(seconds));
};

/**
 * Function that pause the timer and change the text on the button.
 */
const pauseTimer = () => {
	const pauseButton = $("#pausestarttimer");
	if ($(pauseButton).text() == "Pause") {
		$(pauseButton).text("Start");
		clearInterval(timerInterval);
	} else {
		$(pauseButton).text("Pause");
		timerInterval = setInterval(timer, 1000);
	}
};

/**
 * Function that cancel the timer hide the timer section and,
 * show the set section
 */
const cancelTimer = () => {
	// Reset common things that we used in different places
	resetCommonThings();
	// Hide the timer section and show the set section
	$("#inputContainer").animate({ opacity: 0 }, 0, () => {
		$("#inputContainer").animate({ opacity: 1 }, 1500);
		$("#inputContainer").toggleClass("hide");
	});
};

/**
 * Function that hide the timer section and show the times over section.
 */
const startTimesOver = () => {
	// Reset common things that we used in different places.
	resetCommonThings();
	// Hide the timer section and show the times over section.
	$("#timesOver").animate({ opacity: 0 }, 0, () => {
		$("#timesOver").animate({ opacity: 1 }, 1500);
		$("#timesOver").toggleClass("hide");
		$("#timerAlarm")[0].play();
	});
};

/**
 * Function that hide the times over section and show the set time section.
 */
const stopTimesOver = () => {
	// Pause the song that start ion the times over section.
	$("#timerAlarm")[0].pause();
	// Hide the times over section and show the set section.
	$("#timesOver").animate({ opacity: 0 }, 1000, () => {
		$("#timesOver").toggleClass("hide");
		$("#timesOver").css({ opacity: "" });
		$("#inputContainer").animate({ opacity: 0 }, 0, () => {
			$("#inputContainer").animate({ opacity: 1 }, 1000);
			$("#inputContainer").toggleClass("hide");
		});
	});
};

/**
 * Function that reset common things that we used in different places.
 */
const resetCommonThings = () => {
	clearInterval(timerInterval);
	$("#timer").toggleClass("hide");
	$('#addtask input[type="text"]').val("");
	$('#addtime input[type="text"]').val("");
};

$(() => {
	currentDay();
	$("#startimer").click(startTimer);
	$("#pausestarttimer").click(pauseTimer);
	$("#canceltimer").click(cancelTimer);
	$("#stoptimesover").click(stopTimesOver);
});
