class Door extends Collisionblock {
    constructor(position, image_src) {
        super(position, image_src);
    }

    open_door(player) {
        if (keys.s.pressed) {
            if (player.hasKey ) {
               //Next Level
               context.fillStyle = "black";
               context.font = "25pt Helvetica";
               context.fillText("You have a Key", this.position.x - 100, this.position.y - 25);
                player.kill();
            }
            else{
               context.fillStyle = "black";
               context.font = "25pt Helvetica";
               context.fillText("You need a Key", this.position.x - 100, this.position.y - 25);
            }
        }
    }
}