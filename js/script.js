const hoursNode = document.querySelector('.j-hours');
const minutesNode = document.querySelector('.j-minutes');
const secondsNode = document.querySelector('.j-seconds');

const btn25min = document.querySelector('.j-25min');
const btn15min = document.querySelector('.j-15min');
const btn5min = document.querySelector('.j-5min');

const btnPlusHour = document.querySelector('.j-plus-hour');
const btnPlusMinute = document.querySelector('.j-plus-minute');
const btnPlusSecond = document.querySelector('.j-plus-second');

const btnMinusHour = document.querySelector('.j-minus-hour');
const btnMinusMinute = document.querySelector('.j-minus-minute');
const btnMinusSecond = document.querySelector('.j-minus-second');

const btnStart = document.querySelector('.j-start');
const btnPause = document.querySelector('.j-pause');
const btnReset = document.querySelector('.j-reset');

const messageNode = document.querySelector('.j-message');


let currTime = 0; // Текущее время в секундах
let intervId = null; // ID интервала

// Добавляет ведущий нуль, если одна цифра
const to2char = value => (value < 10) ? `0${value}` : `${value}`;


// Отображает текущее время, меняет состояние кнопок
const showCurrTime = () => {
  const hours = Math.floor(currTime / 60 / 60);
  const minutes = Math.floor((currTime - hours * 60 * 60) / 60);
  const seconds = currTime - hours * 60 * 60 - minutes * 60;
  
  hoursNode.innerHTML = to2char(hours);
  minutesNode.innerHTML = to2char(minutes);
  secondsNode.innerHTML = to2char(seconds);

  messageNode.innerHTML = '';

  btnStart.disabled = !(intervId === null) | currTime == 0;
  btnPause.disabled = intervId === null;
}

showCurrTime();

// Отключение таймера
const pauseTimer = () => {
  if (intervId) {
    clearInterval(intervId);
    intervId = null;
  }
}

// Изменение текушего времени таймера с предварительной остановкой таймера
const setTime = (timeSec) => {
  pauseTimer();
  currTime = Math.max(timeSec, 0);
  showCurrTime();
};

// Назначение обработчиков нажатия кнопок
btn25min.addEventListener('click', () => {setTime(25 * 60)});
btn15min.addEventListener('click', () => {setTime(15 * 60)});
btn5min.addEventListener('click', () => {setTime(5 * 60)});

btnPlusHour.addEventListener('click', () => {setTime(currTime + 60 * 60)});
btnPlusMinute.addEventListener('click', () => {setTime(currTime + 60)});
btnPlusSecond.addEventListener('click', () => {setTime(currTime + 1)});

btnMinusHour.addEventListener('click', () => {setTime(currTime - 60 * 60)});
btnMinusMinute.addEventListener('click', () => {setTime(currTime - 60)});
btnMinusSecond.addEventListener('click', () => {setTime(currTime - 1)});

btnStart.addEventListener('click', () => {
  if (!intervId && currTime > 0) {
    intervId = setInterval(() => {
      if (currTime > 0) {
        --currTime;
        showCurrTime();
        if (currTime == 0) {
          pauseTimer();
          showCurrTime();
          messageNode.innerHTML = '<h1>Done!</h1>';
        }
      }
    }, 1000); 
    showCurrTime();
  }
});

btnPause.addEventListener('click', () => {
  pauseTimer();
  showCurrTime();
});

btnReset.addEventListener('click', () => {setTime(0)});
