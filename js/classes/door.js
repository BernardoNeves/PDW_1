class Door extends Collisionblock {
    constructor(position, image_src) {
        super(position, image_src);
    }

  open_door(player) {
    if (input_keys.s.pressed) {
      if (player1.hasKey && player2.hasKey) {
        next_level()
      } else {
        context.fillStyle = "black";
        context.font = "25pt Helvetica";
        context.fillText(
          "Both players need a Key",
          this.position.x - 100,
          this.position.y - 25
        );
      }
    }
  }
}
