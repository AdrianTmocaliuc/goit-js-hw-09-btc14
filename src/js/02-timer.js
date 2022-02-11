import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
};
let selectDateMs = 0;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectDateMs = selectedDates[0].getTime();

    if (selectDateMs < Date.now()) {
      alert('Please choose a date in the future'), (refs.startBtn.disabled = true);
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', runTimer);
let timerId = null;

function runTimer() {
  if (refs.startBtn.textContent !== 'Stop') {
    timerId = setInterval(() => {
      const difDateMs = selectDateMs - Date.now();
      if (difDateMs <= 0) {
        clearInterval(timerId);
      }
      changeTimer(convertMs(difDateMs));
    }, 1000);
    refs.startBtn.textContent = 'Stop';
  } else {
    refs.startBtn.textContent = 'Start';

    clearInterval(timerId);
  }
}

function changeTimer({ days, hours, minutes, seconds }) {
  //
  refs.timer.querySelector('[data-days]').textContent = addLeadingZero(days);
  refs.timer.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  refs.timer.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  refs.timer.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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
