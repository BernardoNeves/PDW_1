var canvas;
var ctx;

const gravity = 9.8 * 0.5;
const friction = 0.5;

var gameLoop;
var player;

window.onload = function () {
  // Assign canvas and context variables
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  player = new Player(100, 400);
  player2 = new Player(400, 400);

  gameLoop = setInterval(update, 1000 / 30);
};

function update() {
  setupInputs()
  
  if (player.y < 380){
    player.y_velocity += gravity;}
  player.update();

  player.x_velocity *= friction;
  player.y_velocity *= friction;

  if (player2.y < 380){
    player2.y_velocity += gravity;}
  player2.update();

  player2.x_velocity *= friction;
  player2.y_velocity *= friction;

  draw();
}

function draw() {
  //Canvas Draw
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1280, 720);

  //Player Draw
  player.draw();
  player2.draw();
}

function setupInputs() {
  document.addEventListener(
    "keydown",
    function (event) {
      if (event.defaultPrevented) {
        return; // Nao faz nada se o evento ja foi processado
      }

      switch (event.key) {
        case "ArrowDown":
        case "s":
          //Movimento para Baixo
          break;
        case "ArrowRight":
        case "d":
          //Movimento para Direita
          player.moveRight();
          player2.moveRight();
          break;
        case "ArrowLeft":
        case "a":
          //Movimento para Esquerda
          player.moveLeft();
          player2.moveLeft();
          break;
        case "ArrowUp":
        case "w":
          //Movimento para Cima
          player.jump();
          player2.jump();
          break;
        default:
          //Quando e pressionada uma tecla que nao e necessitada ele sai
          return;
      }

      event.preventDefault();
    },
    true
  );
}

function collisionDetection() {
  
}