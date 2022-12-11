class Portal {
    constructor(x, y, color) {
        (this.position = {
            x: x,
            y: y,
        }),
        (this.color = color);

        this.width = 10;
        this.height = 50;

        this.positionLink = {
            x: x,
            y: y,
        }
    }

    portalLink(portallink) {
        this.positionLink.x = portallink.position.x;
        this.positionLink.y = portallink.position.y;
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    playerTeletransportator(player) {
        player.position.x = this.positionLink.x;
        player.position.y = this.positionLink.y;
    }
}