const canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

canvas.width = 16 * 45; //720
canvas.height = 16 * 45; //720

const player = new Player(200, 600, "red");

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
  collisionblocks.forEach((collisionblock) => {
    collisionblock.draw();
  });

  player.draw();
  player.update();
}

animate();
