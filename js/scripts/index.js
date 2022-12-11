const canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

canvas.width = 16 * 45; //720
canvas.height = 16 * 45; //720

const player = new Player(100, 400, "red");
const player2 = new Player(300, 600, "blue");
const spike = new Spike(200, 600, "green");
const portal1 = new Portal(0, 600, "purple");
const portal2 = new Portal(650, 600, "purple");

portal1.portalLink(portal2);

const background = new sprite({
  position: {
    x: 0,
    y: 0,
  },
  image_src: "./assets/background.png",
});

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // background.draw()
  collisionblocks.forEach(collisionblock => {collisionblock.draw()})
 
  player.draw();
  player2.draw();
  spike.draw();
  portal1.draw();
  portal2.draw();

  player.update();
  player2.update();
}

animate();
