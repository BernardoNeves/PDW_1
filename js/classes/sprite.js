class Sprite {
  constructor({ position, image_src }) {
    this.position = position;
    this.width = tilesize;
    this.height = tilesize;

    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
    };

    this.image.src = image_src;
    this.loaded = false;
  }

  draw() {
    if (!this.loaded) return;
    context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
}
