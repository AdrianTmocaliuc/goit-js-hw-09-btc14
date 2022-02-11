function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  intervalId: null,
};

// console.log((refs.body.style.backgroundColor = getRandomHexColor()));

refs.startBtn.addEventListener('click', changeBodyColor);
refs.stopBtn.addEventListener('click', stopChangingColor);
// let intervalId = null;

function changeBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
  refs.intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    // console.log(refs.startBtn);
  }, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function stopChangingColor() {
  clearInterval(refs.intervalId);
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
}
