class Player {
  constructor(x, y, color) {
    (this.position = {
      x: x,
      y: y,
    }),
      (this.color = color);
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.gravity = 0.4;
    this.speed = 5;

    this.width = 50;
    this.height = 50;

    this.life = 1;

    this.sides = {
      top: this.position.y,
      bottom: this.position.y + this.height,
      left: this.position.x,
      right: this.position.x + this.width,
    };

    this.initialPosition = {
      x: x,
      y: y,
    };
  }

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    if (keys.a.pressed) player.velocity.x -= player.speed;
    if (keys.d.pressed) player.velocity.x += player.speed;
    if (keys.w.pressed && player.velocity.y === 0) player.velocity.y = -10;
    if (boxCollision(player, player2)) {
      player.velocity.x = 0;
    }
    if (boxCollision(player, player2)) {
      player.velocity.y = 0;
    }

    this.position.y += this.velocity.y;
    this.velocity.y += this.gravity;
    this.sides.bottom = this.position.y + this.height;

    if (this.sides.bottom + this.velocity.y > canvas.height) {
      this.velocity.y = 0;
    }
    if (boxCollision(player, player2)) this.velocity.y = 0;
    this.sides.left = this.position.x;

    if (this.sides.left + this.velocity.x < 0) {
      this.velocity.x = 0;
    }
    this.sides.right = this.position.x + this.width;
    if (this.sides.right + this.velocity.x > canvas.width) {
      this.velocity.x = 0;
    }

    if (boxCollision(player, spike)) {
      this.life = 0;
      this.position.x = this.initialPosition.x;
      this.position.y = this.initialPosition.y;
    }

    if (boxCollision(player, portal1)) {
      portal1.playerTeletransportator(player);
    }

    this.position.x += this.velocity.x;
    player.velocity.x = 0;
  }
}
