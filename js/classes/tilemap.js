class Tilemap {
  constructor(tilemap) {
    this.tilemap = tilemap;
    this.player1_spawnpoint = null;
    this.player2_spawnpoint = null;
    this.collisionblocks = [];
    this.portals = [];
    this.keys = [];
  }

  generate_collision_blocks() {
    this.tilemap.forEach((row, y) => {
      row.forEach((id, x) => {
        var position = {
          x: x * tilesize,
          y: y * tilesize,
        };
        switch (id) {
          case 1:
            this.collisionblocks.push(
              new Collisionblock({ position }, "./assets/tile.png")
            );
            break;
          case 2:
            this.collisionblocks.push(
              new Spike({ position }, "./assets/spike.png")
            );
            break;
          case 3:
            let portal = new Portal({ position }, "./assets/portal.png");
            this.collisionblocks.push(portal);
            this.portals.push(portal);
            break;
          case 4:
            this.collisionblocks.push(
              new Jump_Pad({ position }, "./assets/jumppad.png")
            );
            break;
          case 5:
            let key = new Key({ position }, "./assets/keycard.png");
            this.collisionblocks.push(key);
            this.keys.push(key);
            break;
          case 6:
            this.collisionblocks.push(
              new Door({ position }, "./assets/door.png")
            );
            break;
          case -1:
            this.player1_spawnpoint = {
              x: x * tilesize,
              y: y * tilesize,
            };
            break;
          case -2:
            this.player2_spawnpoint = {
              x: x * tilesize,
              y: y * tilesize,
            };
            break;
        }
      });
    });
  }

  box_collision_x(player, object) {
    if (
      player.sides.left <= object.sides.right &&
      player.sides.right >= object.sides.left &&
      player.sides.bottom >= object.sides.top &&
      player.sides.top <= object.sides.bottom
    ) {
      if (object instanceof Spike) {
        player1.kill();
        player2.kill();
      }

      if (object instanceof Key) {
        object.grabbed = true;
        player.hasKey = true;
        return;
      }

      if (object instanceof Door) {
        player.atdoor = true;
        object.open_door(player);
        return;
      } else player.atdoor = false;

      if (player.velocity.x < 0) {
        if (object instanceof Portal && object.destination != null) {
          object.teleport(player);
          return;
        }
        player.velocity.x = 0;
        player.position.x = object.position.x + object.width + 0.01; // buffer
        return;
      }
      if (player.velocity.x > 0) {
        if (object instanceof Portal && object.destination != null) {
          object.teleport(player);
          return;
        }
        player.velocity.x = 0;
        player.position.x = object.position.x - player.width - 0.01; // buffer
        return;
      }
    }
  }
  box_collision_y(player, object) {
    if (
      player.sides.left <= object.sides.right &&
      player.sides.right >= object.sides.left &&
      player.sides.bottom >= object.sides.top &&
      player.sides.top <= object.sides.bottom
    ) {
      if (object instanceof Spike) {
        players.forEach((player) => {
          player.kill();
        });
      }
      if (object instanceof Jump_Pad) {
        object.launch(player);
        return;
      }

      if (object instanceof Key) {
        object.grabbed = true;
        player.hasKey = true;
        // object.color = "White";
        return;
      }

      if (object instanceof Door) {
        player.atdoor = true;
        object.open_door(player);
        return;
      } else player.atdoor = false;

      if (player.velocity.y < 0) {
        if (object instanceof Portal && object.destination != null) {
          object.teleport(player);
          return false;
        }
        player.velocity.y = 0;
        player.position.y = object.position.y + object.height + 0.01; // buffer
        return false;
      }
      if (player.velocity.y > 0) {
        if (object instanceof Portal && object.destination != null) {
          object.teleport(player);
          return false;
        }
        player.velocity.y = 0;
        player.position.y = object.position.y - player.height - 0.01; // buffer
        return true;
      }
    }
  }
}
