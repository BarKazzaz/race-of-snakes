function Food() {
    this.x = Math.floor(Math.random() * (width - 25)) + 10;
    this.y = Math.floor(Math.random() * (height - 25)) + 10;

    this.show = function() {
        fill(0);
        rect(this.x, this.y, 10, 10);
    }

    this.isEaten = function(s1, s2) {
        //returns 1 if s1 eats, returns 2 if s2 eats, or 0 if nobody eats
        if ((Math.abs(this.x - s1.x) <= 10) && (Math.abs(this.y - s1.y) <= 10)) {
            return 1;
        } else if ((Math.abs(this.x - s2.x) <= 10) && (Math.abs(this.y - s2.y) <= 10)) {
            return 2;
        } else return 0;
    }
}