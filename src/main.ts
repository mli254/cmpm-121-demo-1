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

const squid = document.createElement("button");
squid.innerHTML = "🦑 Squid As Bait | Cost: 10 Fish";
squid.disabled = true;
app.append(squid);

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

squid.addEventListener("click", () => {
  purchase(10, 1);
});

// Adding auto-increment of the button using animate
let last = 0;
let growth = 0;
autoButton();

// Functions
function autoButton() {
  if (performance.now() - last >= 1000) {
    last = performance.now();
    counterMsg.innerHTML = `You have caught ${(counter += growth)} fish!`;
  }

  if (counter >= 10) {
    squid.disabled = false;
  } else if (counter < 10) {
    squid.disabled = true;
  }
  requestAnimationFrame(autoButton);
}

function incrementButton() {
  counterMsg.innerHTML = `You have caught ${(counter += 1)} fish!`;
}

function purchase(price: number, growthRate: number) {
  counterMsg.innerHTML = `You have caught ${(counter -= price)} fish!`;
  growth += growthRate;
}
