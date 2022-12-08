function Player(x, y) {
  this.x = x;
  this.y = y;
  this.x_velocity = 0;
  this.y_velocity = 0;
  this.width = 50;
  this.height = 100;

  this.update = function () {
    this.x += this.x_velocity;
    this.y += this.y_velocity;
  };

  this.moveLeft = function(){
    this.x_velocity -= 5;
}
  this.moveRight = function(){
    this.x_velocity += 5;
}

  this.jump = function(){this.y_velocity = -50;}

  this.draw = function () {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}
