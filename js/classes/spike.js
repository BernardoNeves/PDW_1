class Spike {
    constructor(x, y, color) {
        (this.position = {
            x: x,
            y: y,
        }),
        (this.color = color);

        this.width = 50;
        this.height = 50;
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}