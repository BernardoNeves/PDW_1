class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 400,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.gravity = 0.4;
    this.speed = 3;

    this.width = 50;
    this.height = 50;

    this.sides = {
      top: this.position.y,
      bottom: this.position.y + this.height,
      left: this.position.x,
      right: this.position.x + this.width,
    };
  }

  draw() {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    player.velocity.x = 0;
    if (keys.a.pressed) player.velocity.x -= this.speed;
    if (keys.d.pressed) player.velocity.x += this.speed;
    if (keys.w.pressed && player.velocity.y === 0) player.velocity.y = -10;

    this.position.y += this.velocity.y;
    this.sides.bottom = this.position.y + this.height;
    this.velocity.y += this.gravity;

    if (this.sides.bottom + this.velocity.y > canvas.height) {
      this.velocity.y = 0;
    }
    this.sides.left = this.position.x;
    if (this.sides.left + this.velocity.x < 0) {
      this.velocity.x = 0;
    }
    this.sides.right = this.position.x + this.width;
    if (this.sides.right + this.velocity.x > canvas.width) {
      this.velocity.x = 0;
    }

    this.position.x += this.velocity.x;
  }
}
