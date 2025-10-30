const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    enemy: document.querySelector(".enemy"),
    lives: document.querySelector(".lives"),
  },

  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    livesPlayer: 3,
  },
  actions: {
    countDownTimerId: setInterval(countDown, 1000),
    timerId: setInterval(randomSquare, 1000),
  },
};

function playSound(audioName) {
  const audio = new Audio(`./src/audios/${audioName}.mp3`);
  audio.volume = 0.5;
  audio.play();
}

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    alert("Game Over! O seu resultado foi: " + state.values.result);
    window.location.reload();
  }
}

function livesPlayer() {
  state.values.livesPlayer--;
  state.view.lives.textContent = "x" + state.values.livesPlayer;

  if (state.values.livesPlayer <= 0) {
    alert("Game Over! O seu resultado foi: " + state.values.result);
    window.location.reload();
  }
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);

  let randomSquare = state.view.squares[randomNumber];

  randomSquare.classList.add("enemy");

  state.values.hitPosition = randomSquare.id;
}

// function moveSquare() {
//   state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
// }

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      } else {
        playSound("incorrect");
        livesPlayer();
      }
    });
  });
}

function init() {
  // moveSquare();
  addListenerHitBox();
}

init();
