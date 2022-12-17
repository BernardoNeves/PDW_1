class Portal extends Collisionblock {
  constructor(position) {
    super(position);
    this.destination = null;
    this.color = "purple";
  }

  link(destination) {
    this.destination = destination;
  }

  teleport(player) {
    var relative_position = {
      x: player.position.x - this.position.x,
      y: player.position.y - this.position.y,
    };

    if (player.velocity.x < 0) {
      player.position.x = this.destination.position.x - player.width - 0.01;
    } else if (player.velocity.x > 0) {
      player.position.x =
        this.destination.position.x + this.destination.width + 0.01;
    } else {
      player.position.x =
        this.destination.position.x + relative_position.x + 0.01;
    }

    if (player.velocity.y < 0) {
      player.velocity.y = -player.velocity.y;
      player.position.y =
        this.destination.position.y + this.destination.height + 0.01;
    } else if (player.velocity.y > 0) {
      player.velocity.y = -player.velocity.y;
      player.position.y = this.destination.position.y - player.height - 0.01;
    } else {
      player.position.y =
        this.destination.position.y + relative_position.y - 0.01;
    }
  }
}
