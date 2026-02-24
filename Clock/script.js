let is24Hour = true;
let hideTimer;

const clock = document.getElementById("clock");
const heroText = document.getElementById("heroText");
const formatBtn = document.getElementById("formatBtn");
const bgPicker = document.getElementById("bgPicker");
const clockPicker = document.getElementById("clockPicker");
const heroPicker = document.getElementById("heroPicker");
const controls = document.getElementById("controls");

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = "";

    if (!is24Hour) {
        ampm = hours >= 12 ? " PM" : " AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
    }

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    clock.innerText = `${hours}:${minutes}:${seconds}${ampm}`;
}

formatBtn.onclick = function () {
    is24Hour = !is24Hour;
};

// COLOR CHANGES
bgPicker.oninput = function () {
    document.body.style.background = this.value;
};

clockPicker.oninput = function () {
    clock.style.color = this.value;
};

heroPicker.oninput = function () {
    heroText.style.color = this.value;
};

// AUTO HIDE AFTER 2 SEC
function showControls() {
    controls.style.opacity = "1";

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
        controls.style.opacity = "0";
    }, 2000);
}

document.addEventListener("mousemove", showControls);

// Start hidden after 2 sec
setTimeout(() => {
    controls.style.opacity = "0";
}, 2000);

setInterval(updateClock, 1000);
updateClock();