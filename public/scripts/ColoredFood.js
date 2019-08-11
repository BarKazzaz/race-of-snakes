function ColoredFood(color) {
    Food.call(this);
    this.color = color;
    this.show = function() {
        fill(this.color);
        rect(this.x, this.y, 10, 10);
    }
}