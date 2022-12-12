const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const collisionblocks = [];

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
        collisionblocks.push(
          new Portal({
            position: {
              x: x * 45,
              y: y * 45,
            },
          })
        );
        break;
    }
  });
});

function box_collision_x(player, object) {
  const player_top = player.position.y;
  const player_bottom = player.position.y + player.height;
  const player_left = player.position.x;
  const player_right = player.position.x + player.width;

  const object_top = object.position.y;
  const object_bottom = object.position.y + object.height;
  const object_left = object.position.x;
  const object_right = object.position.x + object.width;

  if (
    player_left <= object_right &&
    player_right >= object_left &&
    player_bottom >= object_top &&
    player_top <= object_bottom
  ) {
    if (player.velocity.x < 0) {
      player.velocity.x = 0;
      player.position.x = object.position.x + object.width + 0.01; // buffer
      return;
    }
    if (player.velocity.x > 0) {
      player.velocity.x = 0;
      player.position.x = object.position.x - player.width - 0.01; // buffer
      return;
    }
  }
}
function box_collision_y(player, object) {
  const player_top = player.position.y;
  const player_bottom = player.position.y + player.height;
  const player_left = player.position.x;
  const player_right = player.position.x + player.width;

  const object_top = object.position.y;
  const object_bottom = object.position.y + object.height;
  const object_left = object.position.x;
  const object_right = object.position.x + object.width;

  if (
    player_left <= object_right &&
    player_right >= object_left &&
    player_bottom >= object_top &&
    player_top <= object_bottom
  ) {
    if (player.velocity.y < 0) {
      player.velocity.y = 0;
      player.position.y = object.position.y + object.height + 0.01; // buffer
      return false;
    }
    if (player.velocity.y > 0) {
      player.velocity.y = 0;
      player.position.y = object.position.y - player.height - 0.01; // buffer
      return true;
    }
  }
}
