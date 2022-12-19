class Collisionblock extends Sprite{
  constructor({ position }, image_src) {

    super({ image_src });

    this.position = position;
    this.width = tilesize;
    this.height = tilesize;
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

}
