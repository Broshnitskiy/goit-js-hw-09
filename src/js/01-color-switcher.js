const btnStartRef = document.querySelector("[data-start]");
const btnStopRef = document.querySelector("[data-stop]");

let intervalId = null;

btnStartRef.addEventListener("click", (e) => {
     document.body.style.backgroundColor = getRandomHexColor();
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    e.target.setAttribute("disabled", "");
});

btnStopRef.addEventListener("click", () => {
    clearInterval(intervalId);
    btnStartRef.removeAttribute("disabled");
});


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
