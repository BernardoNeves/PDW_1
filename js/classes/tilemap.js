class Tilemap {
  constructor(tilemap) {
    this.tilemap = tilemap;
    this.player_spawnpoint = null
    this.player2_spawnpoint = null
    this.collisionblocks = [];
    this.portals = [];
  }

  generate_collision_blocks() {
    this.tilemap.forEach((row, y) => {
      row.forEach((id, x) => {
        var position = {
          x: x * 45,
          y: y * 45,
        };
        switch (id) {
          case 1:
            this.collisionblocks.push(new collisionblock({ position }));
            break;
          case 2:
            this.collisionblocks.push(new Spike({ position }));
            break;
          case 3:
            let portal = new Portal({ position });
            this.collisionblocks.push(portal);
            this.portals.push(portal);
            break;
          case 4:
            this.collisionblocks.push(new Jump_Pad({ position }));
            break;
          case 5:
            this.collisionblocks.push(new Key({ position }));
            break;
          case 6:
            this.collisionblocks.push(new Door({ position }));
            break;
          case -1:
            this.player_spawnpoint = {
              x: x * 45,
              y: y * 45,
            };
            break;
          case -2:
            this.player2_spawnpoint = {
              x: x * 45,
              y: y * 45,
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
      if (object instanceof Spike) player.kill();

      if (object instanceof Key) {
        player.hasKey = true;
        return;
      }

      if(object instanceof Door) {
        object.open_door(player);
        return;
      }

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
      if (object instanceof Spike) player.kill();
      if (object instanceof Jump_Pad) {
        object.launch(player);
        return;
      }

      if (object instanceof Key) {
        player.hasKey = true;
        object.color = "White";
        return;
      }

      if(object instanceof Door) {
        object.open_door(player);
        return;
      }

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
