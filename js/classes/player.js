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
    this.speed = 4;

    this.width = 25;
    this.height = 25;

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

    this.position.x += this.velocity.x;
    collisionblocks.forEach((collisionblock) => {
      box_collision_x(player, collisionblock);
    });

    this.velocity.y += this.gravity;

    this.position.y += this.velocity.y;
    collisionblocks.forEach((collisionblock) => {
      if (box_collision_y(player, collisionblock)) {
        if (keys.w.pressed) player.velocity.y = -11;
      }
    });

    player.velocity.x = 0;
  }
}
