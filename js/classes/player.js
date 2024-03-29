class Player extends Sprite {
  constructor(spawnpoint, image_src) {
    super({ image_src });

    this.spawnpoint = spawnpoint;

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
    this.alive = false;
    this.hasKey = false;
    this.atdoor = false;

    this.width = 22.5;
    this.height = 22.5;

    this.sides = {
      top: this.position.y,
      bottom: this.position.y + this.height,
      left: this.position.x,
      right: this.position.x + this.width,
    };

    this.spawn();
  }

  draw() {
    if (!this.alive) return;
    super.draw();
  }

  update_sides() {
    this.sides.top = this.position.y;
    this.sides.bottom = this.position.y + this.height;
    this.sides.left = this.position.x;
    this.sides.right = this.position.x + this.width;
  }

  update() {
    if (input_keys.r.pressed) this.spawn();
    if (!this.alive) return;

    this.move_x();
    this.apply_gravity();
    this.move_y();
  }

  move_x() {
    this.velocity.x = 0;
    if (input_keys.a.pressed) this.velocity.x -= this.speed;
    if (input_keys.d.pressed) this.velocity.x += this.speed;
    this.position.x += this.velocity.x;
    this.check_collisions_x();
  }

  move_y() {
    this.check_collisions_y();
    this.limit_velocity_y(40);
  }

  limit_velocity_y(max_speed) {
    if (this.velocity.y > max_speed) this.velocity.y -= max_speed / 10;
    else if (this.velocity.y < -max_speed) this.velocity.y += max_speed / 10;
  }

  apply_gravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  jump() {
    this.velocity.y = -this.speed * 2;
  }

  check_collisions_x() {
    tilemap.collisionblocks.forEach((collisionblock) => {
      this.update_sides();
      tilemap.box_collision_x(this, collisionblock);
    });
  }

  check_collisions_y() {
    tilemap.collisionblocks.forEach((collisionblock) => {
      this.update_sides();
      if (tilemap.box_collision_y(this, collisionblock)) {
        if (input_keys.w.pressed) this.jump();
      }
    });
  }

  kill(respawn = true) {
    tilemap.keys.forEach((key, i) => {
      key.grabbed = false;
    });
    this.alive = false;
    this.hasKey = false;
    this.position.x = this.spawnpoint.x + this.width;
    this.position.y = this.spawnpoint.y + this.height - this.height / 4;
    if (respawn)
      setTimeout(() => {
        if (!this.alive) this.spawn();
      }, 1500);
  }

  spawn() {
    this.velocity.x = 0;
    this.velocity.y = 0;
    if (!this.spawnpoint) return;
    this.position.x = this.spawnpoint.x + this.width;
    this.position.y = this.spawnpoint.y + this.height - this.height / 4;
    this.alive = true;
  }
}
