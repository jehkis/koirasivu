// ---------- Exercise 1: click events ----------
// The first button uses onclick="alert('You clicked me!')" directly in the HTML.
// The second button calls showTable(), which builds a table with template strings.

function showTable() {
    const animals = [
        { animal: "Dog",   habitat: "Homes and gardens", diet: "Omnivore" },
        { animal: "Wolf",  habitat: "Forest",            diet: "Meat" },
        { animal: "Horse", habitat: "Meadow",            diet: "Plants" }
    ];

    let rows = "";
    for (const { animal, habitat, diet } of animals) {
        rows += `
            <tr>
                <td>${animal}</td>
                <td>${habitat}</td>
                <td>${diet}</td>
            </tr>`;
    }

    const table = `
        <table id="example" class="display">
            <thead>
                <tr>
                    <th>Animal</th>
                    <th>Habitat</th>
                    <th>Diet</th>
                </tr>
            </thead>
            <tbody>${rows}
            </tbody>
        </table>`;

    document.querySelector("#tableContainer").innerHTML = table;
}

// ---------- Exercise 2: listeners and DOM ----------
const ex1Title = document.querySelector("#ex1Title");
const ex2Title = document.querySelector("#ex2Title");

ex2Title.addEventListener("mouseover", function () {
    console.log("Stepped over me with a mouse!");
});

ex1Title.addEventListener("click", function () {
    ex1Title.style.color = "red";
    ex1Title.innerHTML = "Bye bye mouse!";
});

// ---------- Exercise 3: input events ----------
const feedback = document.querySelector("#feedback");
const charcount = document.querySelector("#charcount");
const statusEl = document.querySelector("#status");
const preview = document.querySelector("#preview");
const MAX_LENGTH = 200;

feedback.addEventListener("focus", function () {
    statusEl.textContent = "Writing...";
    feedback.style.backgroundColor = "#fffbe6";
    feedback.style.borderColor = "var(--grass)";
});

feedback.addEventListener("blur", function () {
    statusEl.textContent = "";
    feedback.style.backgroundColor = "";
    feedback.style.borderColor = "";
});

feedback.addEventListener("input", function () {
    const length = feedback.value.length;
    charcount.textContent = `${length}/${MAX_LENGTH}`;
    charcount.style.color = length > MAX_LENGTH ? "red" : "";
    preview.textContent = feedback.value || "(Preview appears here)";
});

// ---------- Exercise 4: form submit ----------
const feedbackForm = document.querySelector("#feedbackForm");
const formMessage = document.querySelector("#formMessage");

feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = feedback.value.trim();

    if (text.length < 10 || text.length > MAX_LENGTH) {
        formMessage.textContent = `Feedback must be 10-${MAX_LENGTH} characters long (now ${text.length}).`;
        formMessage.classList.add("error");
        return;
    }

    formMessage.classList.remove("error");
    formMessage.textContent = "Thank you for your feedback!";
    feedback.value = "";
    charcount.textContent = `0/${MAX_LENGTH}`;
    charcount.style.color = "";
    preview.textContent = "(Preview appears here)";
});

// ---------- Exercise 5: keyboard events ----------
const keybox = document.querySelector("#keybox");
const keyinfo = document.querySelector("#keyinfo");
const keymods = document.querySelector("#keymods");
const keycount = document.querySelector("#keycount");
const keyCounts = {};

document.addEventListener("keydown", function (event) {
    console.log(event);

    keyinfo.textContent = `Key: ${event.key}, code: ${event.code}`;
    keybox.textContent = event.key === " " ? "Space" : event.key;

    // Bonus: background colour depends on the key
    const hue = (event.key.length === 1 ? event.key.toLowerCase().charCodeAt(0) : event.key.length * 37) * 17 % 360;
    keybox.style.backgroundColor = `hsl(${hue}, 45%, 22%)`;

    // Bonus: how many times this key has been pressed
    keyCounts[event.code] = (keyCounts[event.code] || 0) + 1;
    keycount.textContent = `${event.code} pressed ${keyCounts[event.code]} time(s)`;

    // Bonus: Shift, Ctrl and Alt state
    const mods = [];
    if (event.shiftKey) mods.push("Shift");
    if (event.ctrlKey) mods.push("Ctrl");
    if (event.altKey) mods.push("Alt");
    keymods.textContent = mods.length ? `Held down: ${mods.join(" + ")}` : "No modifier keys held down";
});

// ---------- Bonus: Google Maps and geolocation ----------
const mapBtn = document.querySelector("#mapBtn");
const mapStatus = document.querySelector("#mapStatus");

mapBtn.addEventListener("click", function () {
    if (!navigator.geolocation) {
        mapStatus.textContent = "Geolocation is not supported by this browser.";
        return;
    }

    mapStatus.textContent = "Getting your location...";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log("Latitude:", lat);
            console.log("Longitude:", lon);
            const url = `https://www.google.com/maps?q=${lat},${lon}`;
            window.location.href = url;
        },
        (error) => {
            mapStatus.textContent = "Could not get location: " + error.message;
        }
    );
});
