const startSwitcher = document.querySelector('button[data-start]');
const stopSwitcher = document.querySelector('button[data-stop]');
let switcher = null;

startSwitcher.addEventListener('click', () => {
  startSwitcher.disabled = true;
  document.body.style.backgroundColor = getRandomHexColor();
  switcher = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopSwitcher.addEventListener('click', () => {
  clearInterval(switcher);
  startSwitcher.disabled = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
