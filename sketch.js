let promped = false;

function setup() {
    createCanvas(900, 900);
    let c1 = color(255, 0, 0);
    s1 = new Snake('s1_elem', c1);
    s1.x = 20;
    s1.y = 20;
    let c2 = color(255, 250, 0);
    s2 = new Snake('s2_elem', c2);
    s2.x = width - 20;
    s2.y = height - 20;
    food = new Food();
}

function draw() {
    background(220);
    if (!s1.isDead) {
        s1.update();
        s1.show();
    }
    if (!s2.isDead) {
        s2.update();
        s2.show();
    }
    food.show();
    if (s1.isDead && s2.isDead && !promped) {
        promped = true;
        saveMax(s1.score, s2.score);
        promptRestart();
    }
}

function saveMax(score1, score2) {
    //should save to db if in top 10
    console.log(Math.max(score1, score2));
}

function promptRestart() {
    let r = window.confirm("restart?");
    r ? restart() : gameOver();
}

function restart() {
    promped = false;
    s1 = new Snake(s1);
    s2 = new Snake(s2);
}

function gameOver() {
    alert("GAME OVER");
}

function Food() {
    this.x = Math.floor(Math.random() * (width - 10)) + 10;
    this.y = Math.floor(Math.random() * (height - 10)) + 10;

    this.show = function() {
        fill(0);
        rect(this.x, this.y, 10, 10);
    }
}

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
        //eat
        this.eat();
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

    this.eat = function() {
        if ((Math.abs(food.x - this.x) < 10) &&
            (Math.abs(food.y - this.y) < 10)) {
            this.score += 1;
            this.speed += 1;
            food = new Food();
        }
    }
}

function keyPressed() {
    switch (key) {
        //P1 keys
        case 'a':
            s1.move('L');
            break;
        case 'w':
            s1.move('U');
            break;
        case 'd':
            s1.move('R');
            break;
        case 's':
            s1.move('D');
            break;
            //P2 keys
        case '4':
            s2.move('L');
            break;
        case '8':
            s2.move('U');
            break;
        case '6':
            s2.move('R');
            break;
        case '5':
            s2.move('D');
            break;
    }
}