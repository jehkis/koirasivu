// 1. Button: show / hide the dog facts table
const dogButton = document.querySelector("#dogButton");
const dogTable = document.querySelector("#dogTable");

dogButton.addEventListener("click", function () {
    dogTable.hidden = !dogTable.hidden;
    dogButton.textContent = dogTable.hidden ? "Show dog facts" : "Hide dog facts";
    dogButton.setAttribute("aria-expanded", String(!dogTable.hidden));
});

// 2. Title: click changes text and colour
const dogTitle = document.querySelector("#dogTitle");

dogTitle.addEventListener("click", function () {
    dogTitle.classList.toggle("active");
    dogTitle.textContent = dogTitle.classList.contains("active") ? "Woof! Best friend" : "Dog";
});

// 3. Image: mouseover / mouseout
const dogImage = document.querySelector("#dogImage");

dogImage.addEventListener("mouseover", function () {
    dogImage.classList.add("hover");
    console.log("Mouse is over the dog!");
});

dogImage.addEventListener("mouseout", function () {
    dogImage.classList.remove("hover");
});

// 4. Input: live preview, focus and blur
const animalInput = document.querySelector("#animalInput");
const animalPreview = document.querySelector("#animalPreview");
const animalOutput = document.querySelector("#animalOutput");

animalInput.addEventListener("input", function () {
    animalPreview.textContent = animalInput.value;
});

animalInput.addEventListener("focus", function () {
    animalInput.classList.add("focused");
});

animalInput.addEventListener("blur", function () {
    animalInput.classList.remove("focused");
});

// 5. Form: submit with preventDefault and simple validation
const animalForm = document.querySelector("#animalForm");

animalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const animal = animalInput.value.trim();

    if (animal.length < 2) {
        animalOutput.textContent = "Please type an animal (at least 2 characters).";
        animalOutput.classList.add("error");
        return;
    }

    animalOutput.classList.remove("error");
    animalOutput.textContent = "Your favourite animal is " + animal + ". Mine is the dog!";
    animalInput.value = "";
    animalPreview.textContent = "";
});

// 6. Keyboard: show the last pressed key
const keybox = document.querySelector("#keybox");
const keyinfo = document.querySelector("#keyinfo");

document.addEventListener("keydown", function (event) {
    console.log(event);
    keybox.textContent = event.key;
    keyinfo.textContent = "key: " + event.key + ", code: " + event.code;
});
