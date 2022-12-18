const canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

const tilesize = 40;
canvas.width = 33 * tilesize; //720
canvas.height = 16 * tilesize; //720

// TODO: start/next level fucntions
var lvl = 1;
var tilemap = new Tilemap(levels[lvl]);
tilemap.generate_collision_blocks();

const players = [];
const player1 = new Player(tilemap.player_spawnpoint, "./assets/player.png");
const player2 = new Player(tilemap.player2_spawnpoint, "./assets/player.png");
players.push(player1);
players.push(player2);

function next_level() {
  if (!levels[lvl + 1]) {
    window.location.replace("/index.html");
  }
  lvl++;
  tilemap = new Tilemap(levels[lvl]);
  tilemap.generate_collision_blocks();
  player1.kill();
  player2.kill();
  player1.spawnpoint = tilemap.player1_spawnpoint;
  player2.spawnpoint = tilemap.player2_spawnpoint;
}

var fps, fpsInterval, startTime, now, then, elapsed;

var time, background_image;
fetch("http://worldclockapi.com/api/json/gmt/now")
  .then((res) => res.json())
  .then((data) => (time = data.currentDateTime.slice(11, 13)));

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image_src: background_image,
});

var pause = false;
var pausable = false;
var skipable = false;

function assing_portals() {
  var portal_prev = null;
  tilemap.portals.forEach((portal, i) => {
    if (!(i % 2 == 0)) {
      portal.link(portal_prev);
      portal_prev.link(portal);
    } else portal_prev = portal;
  });
}

function startAnimating(fps) {
  assing_portals();
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  if (time >= 6 && time < 12) background.image.src = "./assets/morning.png";
  if (time >= 12 && time < 16) background.image.src = "./assets/midday.png";
  if (time >= 16 && time < 20) background.image.src = "./assets/afternoon.png";
  if (time >= 20 || time < 6) background.image.src = "./assets/night.png";

  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    if (input_keys.enter.pressed && skipable) next_level();
    if (input_keys.enter.pressed) skipable = false;
    else skipable = true;

    if (input_keys.p.pressed && pausable)
      pause ? (pause = false) : (pause = true);
    if (input_keys.p.pressed) pausable = false;
    else pausable = true;

    if (pause) {
      
      context.font = "25pt Helvetica";
      context.fillStyle = "white";
      context.fillText(
        "Game paused!",
        canvas.width / 2 - 100,
        canvas.height / 2
      );
      context.fillStyle = "rgba(0,0,0,0.1)";
      context.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);

      background.draw();

      tilemap.collisionblocks.forEach((collisionblock) => {
        collisionblock.draw();
      });
      player1.update();
      player1.draw();
      player2.update();
      player2.draw();
    }
  }
  window.requestAnimationFrame(animate);
}

startAnimating(60);
