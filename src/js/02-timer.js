import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.1.0.min.css';

const inputRef = document.querySelector("#datetime-picker");
const btnStartRef = document.querySelector("[data-start]");
const daysRef = document.querySelector("[data-days]");
const hoursRef = document.querySelector("[data-hours]");
const minutesRef = document.querySelector("[data-minutes]");
const secondsRef = document.querySelector("[data-seconds]");

btnStartRef.setAttribute("disabled", "");

let startTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        startTime = selectedDates[0];
      if (startTime < options.defaultDate) {
        //   window.alert("Please choose a date in the future");
          Notify.failure("Please choose a date in the future");
          btnStartRef.setAttribute("disabled", "");
      } else {
          btnStartRef.removeAttribute("disabled");
      }
  },
};

flatpickr(inputRef, options);

btnStartRef.addEventListener("click", onButtonClick);

function onButtonClick() {
    btnStartRef.setAttribute("disabled", "");

    const timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        const time = convertMs(deltaTime);
        if (deltaTime >=0 ) {
            updateTimerface(time);
        }
    }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateTimerface({ days, hours, minutes, seconds }) {
    daysRef.textContent = `${days}`;
    hoursRef.textContent = `${hours}`;
    minutesRef.textContent = `${minutes}`;
    secondsRef.textContent = `${seconds}`;
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}