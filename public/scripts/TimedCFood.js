function TimedCFood(seconds, color, x, y) {
    setTimeout(() => {
        ColoredFood.apply(this, [color]);
        this.x = x;
        this.y = y;
    }, 1);
    setTimeout(() => { t_foods.shift(), 6 });
}