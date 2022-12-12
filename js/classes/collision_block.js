class collisionblock {
  constructor({ position }, color = "rgba(0, 0, 0, 0.2)") {
    this.color = color;
    this.position = position;
    this.width = 45;
    this.height = 45;
  }

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
