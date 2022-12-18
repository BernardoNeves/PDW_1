class Jump_Pad extends Collisionblock {
  constructor(position, image_src) {
    super(position, image_src);
    this.strenght = 1.25;
  }

  launch(player) {
    var relative_position = {
      x: player.position.x - this.position.x,
      y: player.position.y - this.position.y,
    };

    if (player.velocity.y < 0) {
      player.position.y = this.position.y + this.height + 0.01;
      player.velocity.y = -player.velocity.y * this.strenght;
    } else if (player.velocity.y > 0) {
      player.position.y = this.position.y - player.height - 0.01;
      if (player.velocity.y < 1) {
        player.velocity.y = -player.speed * 2 * this.strenght;
      } else player.velocity.y = -player.velocity.y * this.strenght;
    } else {
      player.position.y = this.position.y + relative_position.y - 0.01;
    }
  }
}
