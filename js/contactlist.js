/*Contact List App*/
"use strict";

// Gloabl variables
const emailRegEx = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
const phoneRegEx = /^\d{3}-\d{3}-\d{4}$/;
let contacts = [];

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
 * Function that calculate the currentdate.
 */
const currentDate = () => {
	let month = padSingleDigit(new Date().getMonth() + 1);
	let day = padSingleDigit(new Date().getDate());
	let year = padSingleDigit(new Date().getFullYear());
	const currentDate = year + "-" + month + "-" + day;
	return currentDate;
};

/**
 * Function that adds a leading zero to single digits using a string method.
 * @param {*} num
 * @returns
 */
const padSingleDigit = (num) => num.toString().padStart(2, "0");

/**
 * Function that handle the change from form section to table section and viceversa.
 */
const changeView = () => {
	if ($("#addseecontacts").text() == "See Contacts") {
		contentToDisplay("form", "table");
		$("#addseecontacts").fadeOut(500, function () {
			$("#addseecontacts").text("See registration form").fadeIn(500);			
		});
	} else {
		contentToDisplay("table", "form");
		$("#addseecontacts").fadeOut(500, function () {
			$("#addseecontacts").text("See Contacts").fadeIn(500);
		});
	}
};

/**
 * Functions that handle the animations to change from form section to table section and viceversa.
 * @param {*} contentHide Content that will hide.
 * @param {*} contentShow Content that wil show.
 */
const contentToDisplay = (contentHide, contentShow) => {
	$(contentHide).animate({ opacity: 0, marginTop: "+=50%" }, 900, () => {
		$(contentHide).toggleClass("hide");
		$(contentHide).css({ opacity: "", marginTop: "" });
		$(contentShow).animate({ opacity: 0, marginTop: "+=50%" }, 0, () => {
			$(contentShow).toggleClass("hide");
			$(contentShow).animate({ opacity: 1, marginTop: "-=50%" }, 900);
		});
	});
};

/**
 * Function that ge user's entry, validate it, then add the new contact to the table and the array.
 * @param {*} evt Element clicked
 */
const onSubmit = (evt) => {
	evt.preventDefault();
	// Get the form's entries
	const name = $("#name").val().trim();
	const lastName = $("#lastname").val().trim();
	const email = $("#email").val().trim();
	const phoneNumber = $("#phonenumber").val().trim();
	const address = $("#address").val().trim();
	const birthday = $("#birthday").val().trim();
	let kinshipText = $("#kinshipselect option:selected").text().trim();
	// Boolean to know if there is at least one error on the form.
	let error = false;

	//Validations
	//Name validation
	if (name.length == 0) {
		$("#name").parent().next().text("Please enter a name.");
		error = true;
	} else {
		$("#name").parent().next().text("");
	}
	//Last name validation
	if (lastName.length == 0) {
		$("#lastname").parent().next().text("Please enter a last name.");
		error = true;
	} else {
		$("#lastname").parent().next().text("");
	}
	//Email validation
	if (email.length == 0) {
		$("#email").parent().next().text("Please enter an email address.");
		error = true;
	} else if (!emailRegEx.test(email)) {
		$("#email").parent().next().text("Email must be in the valid format.");
		error = true;
	} else {
		$("#email").parent().next().text("");
	}
	//Phone number validation
	if (phoneNumber.length == 0) {
		$("#phonenumber").parent().next().text("Please enter a phone number.");
		error = true;
	} else if (!phoneRegEx.test(phoneNumber)) {
		$("#phonenumber")
			.parent()
			.next()
			.text("Phone number must be in the valid format: '999-999-9999'.");
		error = true;
	} else {
		$("#phonenumber").parent().next().text("");
	}
	//Address validation
	if (address.length == 0) {
		$("#address").parent().next().text("Please enter an address.");
		error = true;
	} else {
		$("#address").parent().next().text("");
	}

	if (kinshipText == "- Choose one -") {
		kinshipText = "";
	}

	//Add Contact Validation.
	if (!error) {
		// Add contact in table.
		let newRow = $("<tr>");
		newRow.append($("<td>").text(name));
		newRow.append($("<td>").text(lastName));
		newRow.append($("<td>").text(email));
		newRow.append($("<td>").text(phoneNumber));
		newRow.append($("<td>").text(address));
		newRow.append($("<td>").text(birthday));
		newRow.append($("<td>").text(kinshipText));
		$("table").append(newRow);
		// Add contact in array.
		contacts.push({
			name: name,
			lastname: lastName,
			email: email,
			phone: phoneNumber,
			address: address,
			birthday: birthday,
			kinship: kinshipText,
		});
		// Remove the row of the table when there is no contacts added.
		$(".nocontacts").remove();
		//$("form").reset();
		$("form input[type='reset']").click();
		// Show the message of contact added.
		$("#contactadded").animate({ opacity: 1, fontSize: "+=10%" }, 1000, () => {
			$("#contactadded").animate({ fontSize: "-=10%" }, 1000, () => {
				$("#contactadded").animate({ opacity: 0 }, 3500, () => {});
			});
		});
	}
};

/**
 * Function that check if there is no contact added
 */
const checkNoContacts = () => {
	if (contacts.length == 0) {
		let newRow = $("<tr>");
		newRow.addClass("nocontacts");
		newRow.append(
			$('<td colspan="7">').text("There's no contacts added at this moment")
		);
		$("table").append(newRow);
	}
};

$(() => {
	currentDay();
	checkNoContacts();
	$("#birthday").attr("max", currentDate());
	$("#addseecontacts").click(changeView);
	$("form").submit(onSubmit);
});
