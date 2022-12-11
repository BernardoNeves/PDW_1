const collision = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

Array.prototype.parse2D = function () {
  const rows = [];
  for (let i = 0; i < this.length; i += 16) {
    rows.push(this.slice(i, i + 16));
  }
  return rows;
};

class collisionblock {
  constructor({ position }) {
    this.position = position;
    this.width = 45;
    this.height = 45;
  }
  
  draw() {
    context.fillStyle = "green";
    context.fillRect(this.position.x, this.position.x, this.width, this.height);
  }
}

const collisionblocks = [];

const parsed_collisions = collision.parse2D();
parsed_collisions.forEach((row, y) => {
  row.forEach((object, x) => {
    if (object == 1) {
      collisionblocks.push(
        new collisionblock({
          position: {
            x: x * 45,
            y: y * 45,
          },
        })
      );
    }
  });
});

function boxCollision(player, object) {
  const player_top = player.position.y;
  const player_bottom = player.position.y + player.height;
  const player_left = player.position.x;
  const player_right = player.position.x + player.width;
  const object_top = object.position.y;
  const object_bottom = object.position.y + object.height;
  const object_left = object.position.x;
  const object_right = object.position.x + object.width;

  if (
    player_right + player.velocity.x >= object_left &&
    player_left + player.velocity.x <= object_right && 
    player_bottom + player.velocity.y >= object_top &&
    player_top + player.velocity.y <= object_bottom
  )
    if (player.velocity.x < 0){
      player.position.x = object.position.x + object.width + 0.1 // buffer
    }
    if (player.velocity.x > 0){
      player.position.x = object.position.x - player.width - 0.1 // buffer
    }
    if (player.velocity.y < 0){
      player.position.y = object.position.y + object.height + 0.1 // buffer
    }
    if (player.velocity.y > 0){
      player.position.y = object.position.y - player.height - 0.1 // buffer
    }
    return true;
}
// function boxCollision2(player, object) {
//   const player_top = player.position.y;
  // const player_bottom = player.position.y + player.height;
  // const player_left = player.position.x;
  // const player_right = player.position.x + player.width;
//   const object_top = object.position.y;
  // const object_bottom = object.position.y + object.height;
  // const object_left = object.position.x;
  // const object_right = object.position.x + object.width;

//   if (
    // player_right + player.velocity.x >= object_left &&
    // player_left + player.velocity.x <= object_right && 
    // player_bottom + player.velocity.y >= object_top &&
    // player_top + player.velocity.y <= object_bottom
//   )
//     if (player.velocity.y < 0){
//       player.position.y = object.position.y + object.height + 0.1 // buffer
//     }
//     if (player.velocity.y > 0){
//       player.position.y = object.position.y - player.height - 0.1 // buffer
//     }
//     return true;
// }

collisionblocks.forEach(collisionblock =>  {
  boxCollision(player, collisionblock)
});
