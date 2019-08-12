let promped = false;
let COLORS;
let MAIN_COLORS;

function setup() {
    COLORS = { //yellow blue red white green orange purple azure pink
        'yellow': color(250, 250, 0),
        'blue': color(0, 0, 250),
        'red': color(250, 0, 0),
        'white': color(250, 250, 250),
        'green': color(0, 200, 0),
        'orange': color(255, 160, 0),
        'purple': color(150, 0, 255),
        'azure': color(77, 170, 200),
        'pink': color(235, 105, 230),
        'black': color(0, 0, 0),
        'skin': color(210, 120, 100)
    }
    MAIN_COLORS = {
        'yellow': color(250, 250, 0),
        'blue': color(0, 0, 250),
        'red': color(250, 0, 0),
        'white': color(250, 250, 250)
    }

    createCanvas(700, 700);
    s1 = new Snake('s1_elem', "red");
    s1.x = 20;
    s1.y = 20;
    s2 = new Snake('s2_elem', "yellow");
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
    if (food.isEaten(s1, s2) != 0) {
        if (food.isEaten(s1, s2) == 1) {
            s1.score += 1;
            s1.speed += 1;
        } else {
            s2.score += 1;
            s2.speed += 1;
        }
        if (s1.isDead && s2.isDead && !promped) {
            promped = true;
            saveMax(s1.score, s2.score);
            promptRestart();
        }
        food = new Food();
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