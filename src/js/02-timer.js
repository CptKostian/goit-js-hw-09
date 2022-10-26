import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const dateQuery = document.querySelector('input');
const startTimer = document.querySelector('button[data-start]');
const restartTimer = document.querySelector('button[data-restart]');
const interfaceField = document.querySelectorAll('.value');
let endTime = null;
let intervalId = null;
let isTimerStart = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - new Date() <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startTimer.disabled = true;
    } else {
      startTimer.disabled = false;
      endTime = selectedDates[0];
    }
  },
};

flatpickr(dateQuery, options);

startTimer.addEventListener('click', onStartClick);
startTimer.disabled = true;
restartTimer.addEventListener('click', onRestartClick);

function onStartClick() {
  if (isTimerStart) {
    return;
  }
  isTimerStart = true;

  intervalId = setInterval(() => {
    if (endTime > Date.now()) {
      currentTimeFunction(endTime);
    } else {
      Notiflix.Notify.success('Congradulation!!!');
      clearInterval(intervalId);
      isTimerStart = false;
    }
  }, 1000);
}

function onRestartClick() {
  clearInterval(intervalId);
  currentTimeFunction(Date.now());
  isTimerStart = false;
}

function currentTimeFunction(endTime) {
  const convertTime = convertMs(endTime - Date.now());

  interfaceField[0].textContent = addLeadingZero(convertTime.days);
  interfaceField[1].textContent = addLeadingZero(convertTime.hours);
  interfaceField[2].textContent = addLeadingZero(convertTime.minutes);
  interfaceField[3].textContent = addLeadingZero(convertTime.seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
