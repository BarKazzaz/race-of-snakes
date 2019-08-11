function Snake(elm_id, c) {
    this.score = 0;
    this.lives = 4;
    this.color = c;
    this.elem_id = document.getElementById(elm_id);
    this.init = function() {
        this.x = width / 2;
        this.y = height / 2;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.speed = 3;
    }
    this.init();
    this.update = function() {
        //set the UI
        this.elem_id.innerText = "Lives: " + this.lives + " Score: " + this.score;
        //move
        this.x += this.xSpeed * this.speed;
        this.y += this.ySpeed * this.speed;
        //check wall hit
        this.isDead = this.lives < 1;
        if ((this.x < 0) || (this.x > width) || (this.y < 0) || (this.y > height)) {
            this.lives -= 1;
            this.init();
            this.isDead = this.lives < 1;
        }
        // //eat
        // this.eat();
    }

    this.show = function() {
        fill(this.color);
        rect(this.x, this.y, 10, 10);
    }

    this.move = function(direction) {
        switch (direction) {
            case 'U':
                this.xSpeed = 0;
                this.ySpeed = -1;
                break;
            case 'D':
                this.xSpeed = 0;
                this.ySpeed = 1;
                break;
            case 'L':
                this.xSpeed = -1;
                this.ySpeed = 0;
                break;
            case 'R':
                this.xSpeed = 1;
                this.ySpeed = 0;
                break;
        }
    }

    // this.eat = function(_food) {
    //     if ((Math.abs(food.x - this.x) < 10) &&
    //         (Math.abs(food.y - this.y) < 10)) {
    //         this.score += 1;
    //         this.speed += 1;
    //         _food = new Food();
    //     }
    // }
}