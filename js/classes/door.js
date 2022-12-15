class Door extends collisionblock {
    color = "brown";
    constructor(position) {
        super(position);
    }

    open_door(player) {
        if (keys.s.pressed) {
            if (player.hasKey ) {
               //Next Level
               context.fillStyle = "black";
               context.font = "25pt Helvetica";
               context.fillText("You have a Key", this.position.x - 100, this.position.y - 25);
            }
            else{
               context.fillStyle = "black";
               context.font = "25pt Helvetica";
               context.fillText("You need a Key", this.position.x - 100, this.position.y - 25);
            }
        }
    }
}