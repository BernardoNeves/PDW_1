class Door extends Collisionblock {
  constructor(position) {
    super(position);
    this.color = "brown";
  }

  open_door(player) {
    if (input_keys.s.pressed) {
      if (player1.hasKey && player2.hasKey) {
        //Next Level
        player.kill();
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
