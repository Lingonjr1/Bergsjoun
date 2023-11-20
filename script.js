// Fullscreen
function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// Other fullscreen code
var fullscreenButtons = document.getElementsByClassName("fullscreenbutton");
var gameIframe = document.getElementById("gameiframe");

for (var i = 0; i < fullscreenButtons.length; i++) {
    fullscreenButtons[i].addEventListener("click", function () {
        requestFullscreen(gameIframe);
    });
}

// Cookie saving
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return decodeURIComponent(cookie[1]); // Decode the cookie value
        }
    }
    return null;
}

// Set cookie with name and value
// Set cookie with name, value, and path
function setCookie(name, value) {
    const date = new Date();
    date.setTime(date.getTime() + 10 * 365 * 24 * 60 * 60 * 1000); // 10 years in the future
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; " + expires + "; path=/"; // Include path attribute
}


// Apply saved background color
const backgroundColor = getCookie("bgColor");
if (backgroundColor) {
    document.body.style.backgroundColor = backgroundColor;
}

// Change the background color
function changeBackgroundColor(color) {
    // Check if a gradient background is already applied
    const currentBackground = document.body.style.background;
    if (!currentBackground.includes("linear-gradient")) {
        document.body.style.backgroundColor = color;
    }
    setCookie("bgColor", color);
}



// Apply cube color
const cubeColor = getCookie('cubeColor');
if (cubeColor) {
    changeColors(cubeColor);
}

// change the color of the cube and the box shadow
function changeColors(color) {
    const cubeSpans = document.querySelectorAll('.cube-span');
    const cubeTop = document.querySelector('.cube-top');

    for (let i = 0; i < cubeSpans.length; i++) {
        cubeSpans[i].style.background = color;
    }

    cubeTop.style.background = color;

    setCookie('cubeColor', color);
}


// color picker that updates live
const liveColorPicker = document.getElementById('cube-color-picker');
liveColorPicker.addEventListener('input', function () {
    const selectedColor = this.value;
    changeColors(selectedColor);
});

// hide/show div button
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("myDiv").style.display = "none";
});

document.getElementById("toggleButton").addEventListener("click", () => {
    const div = document.getElementById("myDiv");
    div.style.display = div.style.display === "none" ? "block" : "none";
});

// apply custom background color
function applyCustomColor() {
    const colorPicker = document.getElementById("color-picker");
    const customColor = colorPicker.value;
    changeBackgroundColor(customColor);
}

const colorPicker = document.getElementById("color-picker");

colorPicker.addEventListener("input", function () {
    const selectedColor = colorPicker.value;
    applyTextColor(selectedColor);
    updateColorInURL(selectedColor);
});

const queryParams = new URLSearchParams(window.location.search);
const savedColor = queryParams.get("color");
if (savedColor) {
    applyTextColor(savedColor);
}

function applyTextColor(color) {
    const textElements = document.querySelectorAll("body, p, h1, h2, h3, h4, h5, h6, a");
    for (let i = 0; i < textElements.length; i++) {
        textElements[i].style.color = color;
    }
}

function updateColorInURL(color) {
    const currentURL = new URL(window.location.href);
    currentURL.searchParams.set("color", color);
    history.replaceState({}, "", currentURL);
}

// apply the button color from URL parameters or cookies
function applyButtonColor() {
    const queryParams = new URLSearchParams(window.location.search);
    const savedButtonColor = queryParams.get("buttonColor");

    // If a button color is saved in URL parameters, apply it
    if (savedButtonColor) {
        changeButtonColor(savedButtonColor);
    } else {
        // If no color is saved in the URL, check for a cookie
        const buttonColor = getCookie("buttonColor");
        if (buttonColor) {
            changeButtonColor(buttonColor);
        }
    }
}

// Change the button color and save it as a cookie
function changeButtonColor(color) {
    // Get all buttons on the page
    const buttons = document.querySelectorAll("button");

    // Loop through each button and update the style
    buttons.forEach((button) => {
        // Change the button color
        button.style.backgroundColor = color;

        // Update only the box shadow color while keeping the glow effect
        const currentBoxShadow = getComputedStyle(button).boxShadow;
        const updatedBoxShadow = currentBoxShadow.replace(
            /rgba\(\d+, \d+, \d+, [\d.]+\)/,
            color
        );
        button.style.boxShadow = updatedBoxShadow;
    });

    // Save button color as a cookie
    setCookie("buttonColor", color);
}

// Change and apply custom gradient background from top to bottom
function applyCustomGradient() {
    const topColorPicker = document.getElementById("top-color-picker");
    const bottomColorPicker = document.getElementById("bottom-color-picker");

    const topColor = topColorPicker.value;
    const bottomColor = bottomColorPicker.value;

    const gradient = `linear-gradient(to bottom, ${topColor}, ${bottomColor})`;
    changeGradientBackground(gradient);
}

function changeGradientBackground(gradient) {
    // Save gradientbackgroun as a cookie
    setCookie("bgGradient", gradient);

    // Set the gradient background for both body and html elements
    document.body.style.background = gradient;
    document.documentElement.style.background = gradient;
}

// Apply saved gradient background
function applySavedGradient() {
    const savedGradient = getCookie("bgGradient");
    if (savedGradient) {
        document.body.style.background = savedGradient;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    applySavedGradient();
});

// Remove the gradient
function removeGradient() {
    // Reset the background to default
    document.body.style.background = "initial";

    // Remove the gradient data from local storage
    localStorage.removeItem("gradientData");

    // Remove the gradient cookie
    document.cookie = "bgGradient=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

//  Handle the button click
function handleRemoveButtonClick() {
    removeGradient(); // Remove the gradient
}

// Click event listener to the button
document.getElementById("removeGradientButton").addEventListener("click", handleRemoveButtonClick);
