const ejectSounds = [
    new Audio("../sounds/puke1.mp3"),
    new Audio("../sounds/puke2.mp3"),
    new Audio("../sounds/puke3.mp3"),
    new Audio("../sounds/fart1.mp3")
]

function Snake(elm_id, c) {
    this.score = 0;
    this.lives = 4;
    this.default_color = c;
    this.color = c;
    this.elem_id = document.getElementById(elm_id);
    this.init = function() {
        this.x = width / 2;
        this.y = height / 2;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.speed = 3;
        this.color = this.default_color;
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
        if ((this.x < 0) || (this.x > width - 10) || (this.y < 0) || (this.y > height - 10)) {
            this.lives -= 1;
            this.init();
            this.isDead = this.lives < 1;
        }
    }

    this.show = function() {
        fill(COLORS[this.color]); //COLORS = {} from co-op.js
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

    this.getColor = function() {
        if (this.color == this.default_color) return false;
        else return this.color;
    }
    this.setColor = function(color) {
        this.color = color;
        console.log("set color to: " + color);
    }

    this.ejectFood = function() {
        if (!(this.color == this.default_color)) {
            let rand_index = Math.floor(Math.random() * ejectSounds.length);
            ejectSounds[rand_index].play();
            t_foods.push(new TimedCFood(6, this.color, this.x, this.y));
            this.color = this.default_color;
        }
    }
}