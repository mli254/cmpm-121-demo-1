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
const availableItems: Purchasable[] = [
  {
    name: "🦐 Krill",
    price: 10,
    growthRate: 0.1,
    button: document.createElement("button"),
    amount: 0,
    desc: "A staple food source for many creatures.",
  },
  {
    name: "🦑 Squid",
    price: 100,
    growthRate: 2,
    button: document.createElement("button"),
    amount: 0,
    desc: "A favorite treat of sperm whales.",
  },
  {
    name: "🦈 Shark",
    price: 1000,
    growthRate: 50,
    button: document.createElement("button"),
    amount: 0,
    desc: "This might be overkill.",
  },
  {
    name: "🐋 Whale",
    price: 10000,
    growthRate: 200,
    button: document.createElement("button"),
    amount: 0,
    desc: "Can you even fit this on your boat?",
  },
  {
    name: "🌀 Cthulu",
    price: 100000,
    growthRate: -9999,
    button: document.createElement("button"),
    amount: 0,
    desc: "Oh, now you've done it.",
  },
];

createPurchasable(availableItems);

for (let i = 0; i < availableItems.length; i++) {
  availableItems[i].button.addEventListener("click", () => {
    purchase(availableItems[i]);
  });
}

// Adding auto-increment of the button using animate
let growth = 0;
let last = 0;
requestAnimationFrame(autoButton);

// Interaces  =====================
/* Inspired by Aaron in the Discord since the thought of using an interface hadn't occurred to me */
/* Implemented before Step 9, however there are still additional fields besides the 
  initial 3 recommended ones */
interface Purchasable {
  name: string;
  price: number;
  growthRate: number;
  button: HTMLButtonElement;
  amount: number;
  desc: string;
}

// Functions  =====================
function autoButton() {
  const timePassed = performance.now() - last;
  last = performance.now();
  counterMsg.innerHTML = `You have caught ${(counter +=
    growth / timePassed).toFixed(0)} fish!`;
  checkDisabled(availableItems);
  requestAnimationFrame(autoButton);
}

function incrementButton() {
  counterMsg.innerHTML = `You have caught ${(counter += 1)} fish!`;
}

function purchase(thisItem: Purchasable) {
  counterMsg.innerHTML = `You have caught ${(counter -= thisItem.price)} fish!`;
  growth += thisItem.growthRate;
  rateMsg.innerHTML = `${growth.toFixed(1)} fish/second`;

  thisItem.price *= 1.15;
  thisItem.amount += 1;
  if (thisItem.amount > 0) {
    thisItem.button.innerHTML = `<strong>${thisItem.name} (${
      thisItem.amount
    })<br>Rate: ${thisItem.growthRate} | Cost: ${thisItem.price.toFixed(
      1,
    )} Fish</strong><br>${thisItem.desc}`;
  }
}

function createPurchasable(purchasables: Purchasable[]) {
  for (let i = 0; i < purchasables.length; i++) {
    purchasables[
      i
    ].button.innerHTML = `<strong>${purchasables[i].name}<br>Rate: ${purchasables[i].growthRate} | Cost: ${purchasables[i].price} Fish</strong><br>${purchasables[i].desc}`;
    purchasables[i].button.disabled = true;
    app.append(purchasables[i].button);
  }
}

function checkDisabled(purchasables: Purchasable[]) {
  for (let i = 0; i < purchasables.length; i++) {
    if (counter >= purchasables[i].price) {
      purchasables[i].button.disabled = false;
    } else if (counter < purchasables[i].price) {
      purchasables[i].button.disabled = true;
    }
  }
}
