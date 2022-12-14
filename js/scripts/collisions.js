const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [3, 0, 0, 0, 1, , 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 3, 1, 1, 1],
];

const collisionblocks = [];
const portals = [];

map.forEach((row, y) => {
  row.forEach((object, x) => {
    switch (object) {
      case 1:
        collisionblocks.push(
          new collisionblock({
            position: {
              x: x * 45,
              y: y * 45,
            },
          })
        );
        break;
      case 2:
        collisionblocks.push(
          new Spike({
            position: {
              x: x * 45,
              y: y * 45,
            },
          })
        );
        break;
      case 3:
        let portal = new Portal({
          position: {
            x: x * 45,
            y: y * 45,
          },
        });
        collisionblocks.push(portal);
        portals.push(portal);
        break;
      case 4:
        collisionblocks.push(
          new Jump_Pad({
            position: {
              x: x * 45,
              y: y * 45,
            },
          })
        );
        break;
      case -1:
        spawnpoint_x = x * 45;
        spawnpoint_y = y * 45;
        break;
    }
  });
});

function box_collision_x(player, object) {
  if (
    player.sides.left <= object.sides.right &&
    player.sides.right >= object.sides.left &&
    player.sides.bottom >= object.sides.top &&
    player.sides.top <= object.sides.bottom
  ) {
    if (object instanceof Spike) player.kill();
    // if (object instanceof Jump_Pad) {
    //   object.jump(player);
    //   return;
    // }

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
function box_collision_y(player, object) {
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
