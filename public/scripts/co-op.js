let promped = false;
let food;
let c_foods = [];
let inventory;
let MAIN_COLORS;
let COLORS;
let goal;
let goal_elm;
let score = 0;
let score_elm;
let t_foods = [];
let timer;
let timer_elm;

function setup() { //default p5 function
    setColors();
    generateGoal();
    createCanvas(800, 650);
    createSnakes();
    createFoods();
    score_elm = document.getElementById("co-score");
    goal_elm = document.getElementById("goal");
    timer_elm = document.getElementById("timer");
    timer = new Timer(1);
}

function draw() { //default p5 function
    background(220);
    updateAndShowSnakes([s1, s2]);
    scoreHandle();
    goalElmHandle();
    foodHandle();
    updateTimer();
    if (timer.finished) endGameHandle();
}

function keyPressed() { //default p5 function
    timer.start();
    switch (key) {
        /* P1 keys */
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
        case 'Control':
            s1.ejectFood();
            break;

            /* P2 keys */
        case 'ArrowLeft':
            s2.move('L');
            break;
        case 'ArrowUp':
            s2.move('U');
            break;
        case 'ArrowRight':
            s2.move('R');
            break;
        case 'ArrowDown':
            s2.move('D');
            break;
        case ' ':
            s2.ejectFood()
        default:
            console.log(key);
    }
}

/*-- HELPERS --*/
function addColor(color1, color2) {
    switch (color1) {
        case "yellow":
            if (color2 == "blue") {
                return "green";
            } else if (color2 == "red") {
                return "orange";
            } else {
                return color1;
            }

        case "blue":
            if (color2 == "yellow") {
                return "green";
            } else if (color2 == "red") {
                return "purple";
            } else if (color2 == "white") {
                return "azure";
            } else {
                return color1;
            }

        case "red":
            if (color2 == "blue") {
                return "purple";
            } else if (color2 == "yellow") {
                return "orange";
            } else if (color2 == "white") {
                return "pink";
            } else {
                return color1;
            }

        case "white":
            if (color2 == "blue") {
                return "azure";
            } else if (color2 == "red") {
                return "pink";
            } else {
                return color1;
            }
        default:
            return color1;
    }
}

function saveMax(score1, score2) {
    //TODO: should save to db if in top 10
    console.log(Math.max(score1, score2));
}

function promptRestart() {
    let r = window.confirm("restart?");
    r ? restart() : gameOver();
}

function restart() {
    promped = false;
    createSnakes();
    generateGoal();
    timer.restart(1);
    score = 0;
}

function gameOver() {
    timer.restart(1);
    window.location.replace("http://race-of-snakes.herokuapp.com");
}

function generateGoal() {
    let keys = Object.keys(GOAL_COLORS);
    let rand_index = Math.floor(Math.random() * keys.length);
    let random_goal = keys[rand_index];
    goal = random_goal;
}

function snakesCollide() {
    colision_color = addColor(s1.getColor(), s2.getColor());
    if (colision_color == goal && s1.getColor() != goal && s2.getColor() != goal) {
        score += 1;
        generateGoal();
        s1.color = s1.default_color;
        s2.color = s2.default_color;
    }
}

function setColors() {
    COLORS = { //all colors
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
    MAIN_COLORS = { //colors to pickup
        'yellow': color(250, 250, 0),
        'blue': color(0, 0, 250),
        'red': color(250, 0, 0),
        'white': color(250, 250, 250)
    }
    GOAL_COLORS = { //only colors that are generated by a mix
        'green': color(0, 200, 0),
        'orange': color(255, 160, 0),
        'purple': color(150, 0, 255),
        'azure': color(77, 170, 200),
        'pink': color(235, 105, 230)
    }
}

function createSnakes() {
    //S1
    s1 = new Snake('s1_elem', "black");
    s1.x = 20;
    s1.y = 20;

    //S2
    s2 = new Snake('s2_elem', "skin");
    s2.x = width - 20;
    s2.y = height - 20;
}

function createFoods() {
    //food
    Object.keys(MAIN_COLORS).forEach((color) => {
        //for color in COLORS
        c_foods.push(new ColoredFood(color));
    })
}

function scoreHandle() {
    //total score: 
    if ((Math.abs(s2.x - s1.x) <= 10) && (Math.abs(s2.y - s1.y) <= 10)) {
        snakesCollide();
    }
    score_elm.innerText = "Total Score: " + score;
}

function updateAndShowSnakes(snakes_arr) {
    for (let i = 0; i < snakes_arr.length; i++) {
        snakes_arr[i].update();
        snakes_arr[i].show();
    }
}

function goalElmHandle() {
    //goal
    goal_elm.innerText = "GOAL: " + goal;
    goal_elm.style["color"] = goal;
}

function foodHandle() {
    // food.show();
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
    for (let i = 0; i < t_foods.length; i++) {
        t_foods[i].show();
        if ((t_foods[i].isEaten(s1, s2) != 0) || (!t_foods[i].alive)) { //if eaten or if life-time expired
            t_foods.splice(i, 1);
        }
    }
}

function endGameHandle() {
    //endGame
    promped = true;
    saveMax(s1.score, s2.score);
    promptRestart();
}

function updateTimer() {
    let seconds = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;
    let minutes = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
    timer_elm.innerText = minutes + ':' + seconds;
}