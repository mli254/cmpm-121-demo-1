import "./style.css";

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
