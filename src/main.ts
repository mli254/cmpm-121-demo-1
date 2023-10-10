import "./style.css";

// Setting up HTML elements
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Gone Fishing"; // changed name
const buttonName = "🎣 Time to fish!"; // name of button

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = buttonName;
app.append(button);

// Adding counter incrementing on click
let counter: number = 0;
const counterMsg: HTMLDivElement = document.createElement("div");
counterMsg.innerHTML = `You have caught ${counter} fish!`;
app.append(counterMsg);

button.addEventListener("click", () => {
  try {
    incrementButton();
  } catch (TypeError) {
    console.log("document.getElementById returned null");
  }
});

// Adding auto-increment of the button using animate

let last = 0;
autoButton();

// Functions
function autoButton() {
  if (performance.now() - last >= 1000) {
    last = performance.now();
    counterMsg.innerHTML = `You have caught ${(counter += 1)} fish!`;
  }
  requestAnimationFrame(autoButton);
}

function incrementButton() {
  counterMsg.innerHTML = `You have caught ${(counter += 1)} fish!`;
}
