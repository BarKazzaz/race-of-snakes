let promped = false;
let food;
let c_foods = [];
let score_elm;

let COLORS;

function setup() {
    COLORS = {
        'yellow': color(250, 250, 0),
        'blue': color(0, 0, 250),
        'red': color(250, 0, 0),
        'white': color(250, 250, 250),
    }

    score_elm = document.getElementById("co-score");
    createCanvas(700, 700);
    let score = 0;
    //S1
    let c1 = color(255, 0, 0);
    s1 = new Snake('s1_elem', c1);
    s1.x = 20;
    s1.y = 20;
    //S2
    let c2 = color(255, 250, 0);
    s2 = new Snake('s2_elem', c2);
    s2.x = width - 20;
    s2.y = height - 20;

    //food
    Object.keys(COLORS).forEach((color) => {
        //for color in COLORS
        c_foods.push(new ColoredFood(color));
    })
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

    //total score: 
    score = s1.score + s2.score;
    score_elm.innerText = "Total Score: " + score;

    // food.show();
    if (s1.isDead && s2.isDead && !promped) {
        promped = true;
        saveMax(s1.score, s2.score);
        promptRestart();
    }
    for (let i = 0; i < c_foods.length; i++) {
        c_foods[i].show();
        if (c_foods[i].isEaten(s1, s2) != 0) {
            if (c_foods[i].isEaten(s1, s2) == 1) {
                s1.score += 1;
                s1.speed += 1;
            } else {
                s2.score += 1;
                s2.speed += 1;
            }
            c_foods[i] = new ColoredFood(c_foods[i].color);
        }
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