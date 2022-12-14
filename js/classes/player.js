class Player {
  constructor(x, y, color) {
    (this.spawnpoint = {
      x: x,
      y: y,
    }),
      (this.color = color);
    this.position = {
      x: 0,
      y: 0,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.speed = 4;
    this.gravity = this.speed / 20;
    this.alive = true;

    this.width = 22;
    this.height = 22;

    this.sides = {
      top: this.position.y,
      bottom: this.position.y + this.height,
      left: this.position.x,
      right: this.position.x + this.width,
    };

    this.spawn();
  }

  kill() {
    this.alive = false;
    setTimeout(() => {
      this.spawn();
    }, 1500);
  }
  spawn() {
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.position.x = this.spawnpoint.x + this.width;
    this.position.y = this.spawnpoint.y + this.height;
    this.alive = true;
  }

  draw() {
    if (!this.alive) return;
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update_sides() {
    this.sides.top = this.position.y;
    this.sides.bottom = this.position.y + this.height;
    this.sides.left = this.position.x;
    this.sides.right = this.position.x + this.width;
  }
  update() {
    // TODO refactor
    if (!this.alive) return;
    if (keys.a.pressed) this.velocity.x -= this.speed;
    if (keys.d.pressed) this.velocity.x += this.speed;
    if (keys.r.pressed) this.spawn();
    this.position.x += this.velocity.x;
    collisionblocks.forEach((collisionblock) => {
      this.update_sides();
      box_collision_x(this, collisionblock);
    });
    var max_speed = 50;
    if (this.velocity.y > max_speed) this.velocity.y -= max_speed / 10;
    if (this.velocity.y < -max_speed) this.velocity.y += max_speed / 10;
    this.velocity.y += this.gravity;

    this.position.y += this.velocity.y;
    collisionblocks.forEach((collisionblock) => {
      this.update_sides();
      if (box_collision_y(this, collisionblock)) {
        this.jump();
      }
    });

    this.velocity.x = 0;
    // console.log(
    //   "🚀 ~ file: player.js:86 ~ Player ~ update ~ this.position",
    //   this.position
    // );
  }
  jump() {
    if (keys.w.pressed) this.velocity.y = -this.speed * 2;
  }
}
