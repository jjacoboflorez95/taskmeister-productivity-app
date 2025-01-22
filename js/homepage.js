/*Home Page*/
"use strict";

/**
 * Function that animate the sections elements when the mouse hover it in
 * @param {*} evt
 */
const sectionAnimationHoverIn = (evt) => {
	//Animate the section
	$(evt.currentTarget).parent().animate(
		{
			width: "+=2%",
			height: "+=53.438px",
		},
		"slow"
	);
	//Animate the h2 within the section
	$(evt.currentTarget).parent().find("h2").animate(
		{
			fontSize: "+=20%",
		},
		"slow"
	);
	//Animate the p within the section
	$(evt.currentTarget).parent().find("p").animate(
		{
			fontSize: "+=20%",
			width: "+=5%",
		},
		"slow"
	);
};

/**
 * Function that animate the sections elements when the mouse hover it out
 * @param {*} evt
 */
const sectionAnimationHoverOut = (evt) => {
	//Animate the section
	$(evt.currentTarget).parent().animate(
		{
			width: "-=2%",
			height: "-=53.438px",
		},
		"slow"
	);
	//Animate the h2 within the section
	$(evt.currentTarget).parent().find("h2").animate(
		{
			fontSize: "-=20%",
		},
		"slow"
	);
	//Animate the p within the section
	$(evt.currentTarget).parent().find("p").animate(
		{
			fontSize: "-=20%",
			width: "-=5%",
		},
		"slow"
	);
};

/**
 * Function that change the main image of the home page based on the window device width.
 */
const windowDeviceMainImage = () => {
	if ($(window).width() <= 860) {
		$("#mainimage").attr("src", "imgs/mainimage2.png");
	} else {
		$("#mainimage").attr("src", "imgs/mainimage1.webp");
	}
};

$(() => {
	$("#apps section img").hover(
		sectionAnimationHoverIn,
		sectionAnimationHoverOut
	);
	windowDeviceMainImage();
	$(window).resize(windowDeviceMainImage);
});
