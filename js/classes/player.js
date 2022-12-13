class Player {
  constructor(x, y, color) {
    (this.spawnpoint = {
      x: x,
      y: y,
    }),
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
    this.alive = true;

    this.width = 25;
    this.height = 25;

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

  kill() {
    this.alive = false;
    setTimeout(() => { this.spawn() }, 1500);
  }
  spawn() {
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.position.x = this.spawnpoint.x;
    this.position.y = this.spawnpoint.y;
    this.alive = true;
  }

  draw() {
    if (!this.alive) return;
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    if (!this.alive) return;
    if (keys.a.pressed) this.velocity.x -= this.speed;
    if (keys.d.pressed) this.velocity.x += this.speed;

    this.position.x += this.velocity.x;
    collisionblocks.forEach((collisionblock) => {
      box_collision_x(this, collisionblock);
    });

    this.velocity.y += this.gravity;

    this.position.y += this.velocity.y;
    collisionblocks.forEach((collisionblock) => {
      if (box_collision_y(this, collisionblock)) {
        if (keys.w.pressed) this.velocity.y = -11;
      }
    });

    this.velocity.x = 0;
  }
}
