class Portal extends collisionblock {
  color = "purple";
  constructor(position) {
    super(position);
    // this.position = position;
    this.positionLink = {
      x: this.position.x,
      y: this.position.y,
    };
    this.destination = null;
  }

  link(destination) {
    this.destination = destination;
  }

  teleport(player) {
    if (player.velocity.x < 0) {
      player.position.x = this.destination.position.x - player.width - 0.01; // bufferaa
      // return;
    } else if (player.velocity.x > 0) {
      player.position.x =
        this.destination.position.x + this.destination.width + 0.01; // buffer
      // return;
    } else player.position.x = this.destination.position.x;

    if (player.velocity.y < 0) {
      player.velocity.y = -player.velocity.y;
      player.position.y =
        this.destination.position.y + this.destination.height + 0.01; // buffer
      // return false;
    } else if (player.velocity.y > 0) {
      player.velocity.y = -player.velocity.y;
      player.position.y = this.destination.position.y - player.height - 0.01; // buffer
      // return true;
    } else player.position.y = this.destination.position.y;
  }
}
