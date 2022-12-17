class Key extends Collisionblock {
  constructor(position) {
    super(position);
    this.color = "yellow";
    this.grabbed = false;
  }

  draw() {
    if (this.grabbed == false) super.draw();
  }
}
