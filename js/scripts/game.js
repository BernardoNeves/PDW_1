const canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

canvas.width = 33 * 45; //720
canvas.height = 16 * 45; //720

// TODO: start/next level fucntions
window.onload = () => {};

const tilemap = new Tilemap(levels[1]);
tilemap.generate_collision_blocks();

const player = new Player(tilemap.player_spawnpoint, "red");
console.log(
  "🚀 ~ file: game.js:14 ~ player_spawnpoint",
  tilemap.player_spawnpoint
);
const player2 = new Player(tilemap.player2_spawnpoint, "pink");
console.log(
  "🚀 ~ file: game.js:14 ~ player2_spawnpoint",
  tilemap.player2_spawnpoint
);

const background = new sprite({
  position: {
    x: 0,
    y: 0,
  },
  image_src: "./assets/background.png",
});

var pause = false;
var pausable = false;

function assing_portals() {
  var portal_prev = null;
  tilemap.portals.forEach((portal, i) => {
    if (!(i % 2 == 0)) {
      portal.link(portal_prev);
      portal_prev.link(portal);
    } else portal_prev = portal;
  });
}

function animate() {
  if (keys.p.pressed && pausable) pause ? (pause = false) : (pause = true);
  if (keys.p.pressed) pausable = false;
  else pausable = true;

  if (pause) {
    context.font = "25pt Helvetica";
    context.fillStyle = "white";
    context.fillText("Game paused!", canvas.width / 2 - 100, canvas.height / 2);
    context.fillStyle = "rgba(0,0,0,0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    assing_portals();
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // background.draw();

    tilemap.collisionblocks.forEach((collisionblock) => {
      collisionblock.draw();
    });
    player.draw();
    player.update();
    player2.draw();
    player2.update();
  }
  setTimeout(window.requestAnimationFrame(animate), 10000 / 60);
}

animate();
