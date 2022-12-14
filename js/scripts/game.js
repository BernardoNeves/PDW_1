const canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

canvas.width = 16 * 45; //720
canvas.height = 16 * 45; //720

// TODO: start/next level fucntions
const tilemap = new Tilemap(levels[1]);
tilemap.generate_collision_blocks();

const player = new Player(tilemap.spawnpoint.x, tilemap.spawnpoint.y, "red");

const background = new sprite({
  position: {
    x: 0,
    y: 0,
  },
  image_src: "./assets/background.png",
});

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
  assing_portals();
  window.requestAnimationFrame(animate);
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // background.draw();

  tilemap.collisionblocks.forEach((collisionblock) => {
    collisionblock.draw();
  });
  player.draw();
  player.update();
}

animate();
