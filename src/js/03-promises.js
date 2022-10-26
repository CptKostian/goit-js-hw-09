import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const submitBtn = document.querySelector('.form');

submitBtn.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  let delayTime = Number(delay.value);

  for (let i = 0; i < amount.value; i++) {
    if (delayTime > 0) {
      createPromise(i + 1, delayTime)
        .then(result => Notiflix.Notify.success(result))
        .catch(error => Notiflix.Notify.failure(error));
    }

    delayTime += Number(step.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
