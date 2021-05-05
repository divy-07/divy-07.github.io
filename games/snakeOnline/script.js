
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

const box = 32;

// images

const ground = new Image();
ground.src = "./assets/ground.png";

const foodImg = new Image();
foodImg.src = "./assets/food.png";

// snake create

let snake = [];
snake[0] = {
    x: 9*box,
    y: 10*box
};

// food create

let food = {
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
}

// score

let score = 0;

// prevent window from moving with arrow keys

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

// control snake

let d;

document.addEventListener("keydown", direction);

function direction(event){
    if ((event.keyCode == 37 || event.keyCode == 65) && d != "RIGHT"){
        d = "LEFT";
    }
    else if ((event.keyCode == 38 || event.keyCode == 87) && d != "DOWN"){
        d = "UP";
    }
    else if ((event.keyCode == 39 || event.keyCode == 68) && d != "LEFT"){
        d = "RIGHT";
    }
    else if ((event.keyCode == 40 || event.keyCode == 83) && d != "UP"){
        d = "DOWN";
    }
}

// check collision

function collision(head, array) {
    for (let i=0; i<array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

//draw

function draw() {

    ctx.drawImage(ground, 0, 0);

    // drawing snake
    for (let i=0; i<snake.length; i++){
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // adding box to snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d=="LEFT") snakeX -= box;
    if (d=="UP") snakeY -= box;
    if (d=="RIGHT") snakeX += box;
    if (d=="DOWN") snakeY += box;
    
    // if eat

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random()*17+1) * box,
            y: Math.floor(Math.random()*15+3) * box
        }
    }
    else {
        snake.pop();
    }

    // new head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // gameOver

    if (snakeX < box || snakeX > 17*box
        || snakeY < 3*box || snakeY > 17*box
        || collision(newHead, snake)) {
            clearInterval(game);
    }

    snake.unshift(newHead);

    // drawing points
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);

}

let game = setInterval(draw, 100);



