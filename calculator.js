import init, { simpson } from "./pkg/Simpson.js";

const div = document.getElementById("simpson");
const functionInput = document.querySelector(".functionInput");
const startInput = document.querySelector(".startInput");
const endInput = document.querySelector(".endInput");
const precisionInput = document.querySelector(".precisionInput");
const submit = document.querySelector(".calculateButton");

init().then(() => {
  submit.addEventListener("click", (e) => {
    e.preventDefault();

    if (!checkValidity()) return;

    const result = simpson(
      (x) => eval(functionInput.value),
      startInput.value,
      endInput.value,
      precisionInput.value
    ).toFixed(4).toString();
    
    div.innerHTML = `<div id="simpson">Wynik: ${result}[j<sup>2</sup>]</div>`;

    const a = parseInt(startInput.value);
    const b = parseInt(endInput.value);
    const precision = parseInt(precisionInput.value);

    const xCoordinates = [];
    const yCoordinates = [];

    for (let i = a; i <= b; i += 0.25) {
      let y = eval(functionInput.value.replaceAll("x", i));
      xCoordinates.push(i);
      yCoordinates.push(y);
    }

    const ctx = document.getElementById("chart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xCoordinates,
        datasets: [
          {
            label: `f(x) = ${functionInput.value}`,
            data: yCoordinates,
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderColor: "rgba(0, 0, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: false,
          },
          x: {
            beginAtZero: false,
            max: 400,
            min: 0,
          },
        },
      },
    });
  });
});

const checkValidity = () => {
  return (
    functionInput.reportValidity() &&
    startInput.reportValidity() &&
    endInput.reportValidity() &&
    precisionInput.reportValidity() &&
    precisionInput.value % 2 === 0
  );
};
