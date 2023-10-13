import "./style.css";

// Setting up HTML elements
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Gone Fishing"; // changed name
const buttonName = "🎣 Time to fish!"; // name of button

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const subheader = document.createElement("h2");
subheader.innerHTML =
  "Out on the open ocean, there's no telling what you'll catch.<br>Click to cast your line!";
app.append(subheader);

const rateMsg: HTMLDivElement = document.createElement("div");
rateMsg.innerHTML = `0 fish/second`;
app.append(rateMsg);

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

// setting up purchasables
const krill: Purchasable = {
  name: "🦐 Krill",
  price: 10,
  growthRate: 0.1,
  button: document.createElement("button"),
  amount: 0,
};

const squid: Purchasable = {
  name: "🦑 Squid",
  price: 100,
  growthRate: 2,
  button: document.createElement("button"),
  amount: 0,
};

const whale: Purchasable = {
  name: "🐋 Whale",
  price: 1000,
  growthRate: 50,
  button: document.createElement("button"),
  amount: 0,
};
createPurchasable(krill);
createPurchasable(squid);
createPurchasable(whale);

krill.button.addEventListener("click", () => {
  purchase(krill);
});
squid.button.addEventListener("click", () => {
  purchase(squid);
});
whale.button.addEventListener("click", () => {
  purchase(whale);
});

// Adding auto-increment of the button using animate
let growth = 0;
autoButton();

// Interaces  =====================
/* Inspired by Aaron in the Discord since the thought of using an interface hadn't occurred to me */
interface Purchasable {
  name: string;
  price: number;
  growthRate: number;
  button: HTMLButtonElement;
  amount: number;
}

// Functions  =====================
function autoButton() {
  counterMsg.innerHTML = `You have caught ${(counter += growth / 60).toFixed(
    0,
  )} fish!`;

  checkDisabled(krill);
  checkDisabled(squid);
  checkDisabled(whale);
  requestAnimationFrame(autoButton);
}

function incrementButton() {
  counterMsg.innerHTML = `You have caught ${(counter += 1)} fish!`;
}

function purchase(thisPurchasable: Purchasable) {
  counterMsg.innerHTML = `You have caught ${(counter -=
    thisPurchasable.price)} fish!`;
  growth += thisPurchasable.growthRate;
  rateMsg.innerHTML = `${growth.toFixed(1)} fish/second`;

  thisPurchasable.price *= 1.15;
  thisPurchasable.amount += 1;
  if (thisPurchasable.amount > 0) {
    thisPurchasable.button.innerHTML = `${thisPurchasable.name}<br>Rate: ${
      thisPurchasable.growthRate
    } | Cost: ${thisPurchasable.price.toFixed(1)} Fish (${
      thisPurchasable.amount
    })`;
  }
}

function createPurchasable(thisPurchasable: Purchasable) {
  thisPurchasable.button.innerHTML = `${thisPurchasable.name}<br>Rate: ${thisPurchasable.growthRate} | Cost: ${thisPurchasable.price} Fish`;
  thisPurchasable.button.disabled = true;
  app.append(thisPurchasable.button);
}

function checkDisabled(thisPurchasable: Purchasable) {
  if (counter >= thisPurchasable.price) {
    thisPurchasable.button.disabled = false;
  } else if (counter < thisPurchasable.price) {
    thisPurchasable.button.disabled = true;
  }
}
