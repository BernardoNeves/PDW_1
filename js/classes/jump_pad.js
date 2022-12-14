class Jump_Pad extends collisionblock {
  color = "blue";
  constructor(position) {
    super(position);
    this.strenght = 1.25;
  }

  launch(player) {
    var relative_position = {
      x: player.position.x - this.position.x,
      y: player.position.y - this.position.y,
    };

    // if (player.velocity.x < 0) {
    //   player.position.x = this.position.x + this.width + 0.01;
    //   player.velocity.x = player.speed * 50;
    //   player.position.x += player.velocity.x;
    // } else if (player.velocity.x > 0) {
    //   player.position.x = this.position.x - player.width - 0.01;
    //   player.velocity.x = -player.speed * 50;
    //   player.position.x += player.velocity.x;
    // } else {
    //   player.position.x = this.position.x + relative_position.x + 0.01;
    // }

    if (player.velocity.y < 0) {
      player.velocity.y = 0;
      player.position.y = this.position.y + this.height + 0.01;
    } else if (player.velocity.y > 0) {
      player.position.y = this.position.y - player.height - 0.01;
      if (player.velocity.y < 1) {
        // player.jump();
        player.velocity.y = -player.speed * 2 * this.strenght;
      } else player.velocity.y = -player.velocity.y * this.strenght;
    } else {
      player.position.y = this.position.y + relative_position.y - 0.01;
    }
  }
}
