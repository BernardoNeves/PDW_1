class Key extends Collisionblock {
  constructor(position, image_src) {
    super(position, image_src);
    this.grabbed = false;
  }

  draw() {
    if (this.grabbed == false) super.draw();
  }
}
