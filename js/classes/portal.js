class Portal extends collisionblock {
  constructor(position) {
    super(position);
    this.positionLink = {
      x: this.position.x,
      y: this.position.y,
    };
  }

  color = "purple";

  portalLink(portallink) {
    this.positionLink.x = portallink.position.x;
    this.positionLink.y = portallink.position.y;
  }

  playerTeletransportator(player) {
    player.position.x = this.positionLink.x;
    player.position.y = this.positionLink.y;
  }
}
