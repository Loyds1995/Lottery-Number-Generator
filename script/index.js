import { letters } from "./data/letter.js";
import { options } from "./data/input.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
const today = dayjs().format("dddd, MMMM D, YYYY");

// Display the date in the 'date' element
document.getElementById("date").textContent = today;

document.addEventListener('DOMContentLoaded', ()=>{
  let generateNumber = JSON.parse(localStorage.getItem('result')) || [];
   displayNumber.innerHTML = generateNumber.join(" - ");
});

// generate the letters to html
let letterHTML = '';

letters.forEach((letter)=>{
  letterHTML += `<div class="letter">${letter.letter}</div>`;
});

document.querySelector('.letter-container').innerHTML = letterHTML;

// generate input option

const numberOptionContainer = document.querySelector('.number-option-container');

options.forEach((option, index) => {
  const radioBtn = document.createElement('input');
  radioBtn.type = "radio";
  radioBtn.name = "number-option";
  radioBtn.value = option.value;
  radioBtn.id = `option${index + 1}`

  const label = document.createElement('label');
  label.htmlFor = `option${index + 1}`;
  label.textContent = option.label;

  numberOptionContainer.appendChild(radioBtn);
  numberOptionContainer.appendChild(label);
});




const numberOption = document.querySelector(".number-option-container");
const generateBtn = document.querySelector(".generate-button");
const resetBtn = document.querySelector('.reset-button');
const displayNumber = document.querySelector(".display-number");
const radioBtn = numberOption.querySelectorAll('input[type="radio"]'); //selects all radio input elements within the numberOption container and assigns them to the radioBtn constant

let selectedOption = null; //store the user's selected option.

//updates the selectedOption variable with the value of the selected radio button.
//ensures the selectedOption holds the value of the chosen option.
radioBtn.forEach((radioButton) => {
  radioButton.addEventListener("change", () => {
    if (radioButton.checked) {
      selectedOption = radioButton.value;

      displayNumber.textContent = ""; //clear the message when the option is selected
      displayNumber.classList.remove("alert-message"); // remove the alert-message class
      //change the color back to original color
    }
  });
});

generateBtn.addEventListener("click", () => {
  if (selectedOption === "option1") {
    lotteryNum(42, 6);
  } else if (selectedOption === "option2") {
    lotteryNum(45, 6);
  } else if (selectedOption === "option3") {
    lotteryNum(49, 6);
  } else if (selectedOption === "option4") {
    lotteryNum(55, 6);
  } else if (selectedOption === "option5") {
    lotteryNum(58, 6);
  } else {
    displayNumber.textContent = "Please select option!";

    displayNumber.classList.add("alert-message");
  }
});

//range -the range of possible numbers-
//and numCount -the number of numbers to generate
function lotteryNum(range, numCount) {
  let randomArr = [];
  for (let i = 1; i <= range; i++) {
    randomArr.push(i);
  }

  let result = []; //stores the generated numbers

  //loop to randomly pick numbers from randomArr and add them to the result array
  //while shuffling the randomArr to avoid duplicates.
  for (let a = 0; a < numCount; a++) {
    let randomNum = Math.floor(Math.random() * range);
    result.push(randomArr[randomNum]);
    randomArr[randomNum] = randomArr[range - 1];
    range--;
  }

  localStorage.setItem('result', JSON.stringify(result));

  displayNumber.textContent = ""; // Clear any previous alert message
  displayNumber.innerHTML = result.join(" - ");
}


resetBtn.addEventListener('click', () => {
  selectedOption =null;
  radioBtn.forEach((radioButton) => {
    radioButton.checked = false;
  });
  displayNumber.textContent = "0";
  displayNumber.classList.remove("alert-message");
});
