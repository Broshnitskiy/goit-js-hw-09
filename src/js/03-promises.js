import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.1.0.min.css';

const formRef = document.querySelector(".form");

formRef.addEventListener("submit", (e) => {
  e.preventDefault();
  const amountValue = e.target.elements.amount.value;
  const delayValue = e.target.elements.delay.value;
  const stepValue = e.target.elements.step.value;
  let delay = delayValue;
  
  for (let i = 1; i <= amountValue; i += 1){
    createPromise(i, delay)
    .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
    // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
   
    delay = Number(delay) + Number(stepValue);
  };
  
})
  
  
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
    resolve({position, delay})
      } else {
    reject({position, delay})
      }
    }, delay)
  })
}
