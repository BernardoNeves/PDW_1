class Collisionblock {
  constructor({ position }, color = "rgba(0, 0, 0, 0.2)") {
    this.color = color;
    this.position = position;
    this.width = 45;
    this.height = 45;
    this.sides = {
      top: this.position.y,
      bottom: this.position.y + this.height,
      left: this.position.x,
      right: this.position.x + this.width,
    };
  }

  update_sides() {
    this.sides.top = this.position.y;
    this.sides.bottom = this.position.y + this.height;
    this.sides.left = this.position.x;
    this.sides.right = this.position.x + this.width;
  }

  update() {
    this.update_sides();
  }

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
