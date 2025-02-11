/*Home Page*/
"use strict";

// Guarda el tamaño original de la sección y sus elementos
const originalSizes = new Map();

const saveOriginalSizes = (section) => {
    if (!originalSizes.has(section[0])) {
        originalSizes.set(section[0], {
            width: section.width(),
            height: section.height(),
            fontSizeH2: section.find("h2").css("font-size"),
            fontSizeP: section.find("p").css("font-size"),
            widthP: section.find("p").css("width"),
        });
    }
};

/**
 * Function that animates the sections when the mouse hovers in.
 * @param {*} evt
 */
const sectionAnimationHoverIn = function () {
    let section = $(this).closest("section");

    saveOriginalSizes(section); // Guarda los valores originales

    section.stop(true, true).animate(
        {
            width: "+=2%",
            height: "+=20px",
        },
        "slow"
    );

    section.find("h2").stop(true, true).animate(
        {
            fontSize: "2.2rem", // Valor absoluto para evitar inconsistencias
        },
        "slow"
    );

    section.find("p").stop(true, true).animate(
        {
            fontSize: "1.1rem",
            width: "85%",
        },
        "slow"
    );
};

/**
 * Function that animates the sections when the mouse hovers out.
 * @param {*} evt
 */
const sectionAnimationHoverOut = function () {
    let section = $(this).closest("section");

    let original = originalSizes.get(section[0]);
    if (!original) return;

    section.stop(true, true).animate(
        {
            width: original.width,
            height: original.height,
        },
        "slow"
    );

    section.find("h2").stop(true, true).animate(
        {
            fontSize: original.fontSizeH2,
        },
        "slow"
    );

    section.find("p").stop(true, true).animate(
        {
            fontSize: original.fontSizeP,
            width: original.widthP,
        },
        "slow"
    );
};

/**
 * Function that changes the main image of the home page based on the window device width.
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
