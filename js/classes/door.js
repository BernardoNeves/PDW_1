class Door extends Collisionblock {
  constructor(position, image_src) {
    super(position, image_src);
  }

  open_door(player) {
    if (input_keys.s.pressed) {
      if (player1.hasKey && player2.hasKey)
        if (player1.atdoor && player2.atdoor) next_level();
        else {
          context.fillStyle = "black";
          context.font = "25pt Helvetica";
          context.fillText(
            "Both players need to be at a door",
            this.position.x - 100,
            this.position.y - 25
          );
        }
      else {
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
