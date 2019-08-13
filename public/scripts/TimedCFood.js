function TimedCFood(seconds, color, x, y) {
    ColoredFood.apply(this, [color]);
    this.seconds = seconds;
    this.x = x;
    this.y = y;
    this.alive = true;
    this.eatable = false;

    setTimeout(() => this.eatable = true, 1000);
    setTimeout(() => this.alive = false, seconds * 1000);

    this.isEaten = function(s1, s2) {
        if (!this.eatable) return 0;
        // TODO: else return ColoredFood.prototype.isEaten.call(this, [s1, s2]);

        //returns 1 if s1 eats, returns 2 if s2 eats, or 0 if nobody eats
        if ((Math.abs(this.x - s1.x) <= 10) && (Math.abs(this.y - s1.y) <= 10)) { //if s1 eats
            let s1_color = s1.getColor();
            if (s1_color) s1.setColor(addColor(s1.getColor(), this.color))
            else s1.setColor(this.color);
            return 1;
        } else if ((Math.abs(this.x - s2.x) <= 10) && (Math.abs(this.y - s2.y) <= 10)) { //if s2 eats
            let s2_color = s2.getColor();
            if (s2_color) s2.setColor(addColor(s2.getColor(), this.color))
            else s2.setColor(this.color);
            return 2;
        } else return 0;
    }
}