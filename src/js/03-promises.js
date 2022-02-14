import '../css/common.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  const { delay, step, amount } = e.target.elements;
  // console.log(Number(step.value));
  const amountNm = Number(amount.value);
  const stepNm = Number(step.value);
  let delayNm = Number(delay.value);
  for (let i = 1; i <= amountNm; i++) {
    createPromise(i, delayNm)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayNm += stepNm;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}
