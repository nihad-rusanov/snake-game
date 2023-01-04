const gameBoard = document.querySelector("#gameBoard");
const score = document.querySelector("#score");
let score_text = 0;
const resetBtn = document.getElementById("resetBtn");
const left = document.getElementById("left");
const right = document.getElementById("right");
const up = document.getElementById("up");
const down = document.getElementById("down");
let canvas = gameBoard.getContext("2d");
let bg_height = gameBoard.height;
let bg_width = gameBoard.width;
let foodX;
let foodY;
let snakeColor = "green";
let foodColor = "red";
let backgroundColor = "white";
let borderColor = "black";
let unitsize = 25;
let snake_x = unitsize;
let snake_y = 0;
let running = false;
let snake = [
  { x: unitsize * 4, y: 0 },
  { x: unitsize * 3, y: 0 },
  { x: unitsize * 2, y: 0 },
  { x: unitsize, y: 0 },
  { x: 0, y: 0 },
];


resetBtn.addEventListener("click", reset);

function drawSnake() {
  for (item of snake) {
    canvas.fillStyle = snakeColor;
    canvas.strokeRect(item.x, item.y, unitsize, unitsize);
    canvas.fillRect(item.x, item.y, unitsize, unitsize);
  }
}

function clearBoard() {
  canvas.fillStyle = backgroundColor;
  canvas.fillRect(0, 0, bg_width, bg_height);
}
function moveSnake() {
  let head = {
    x: snake[0].x + snake_x,
    y: snake[0].y + snake_y,
  };

  snake.unshift(head);

  if (snake[0].x == foodX && snake[0].y === foodY) {
    create_food();
    score_text += 1;
    score.textContent = score_text;
  } else {
    snake.pop();
  }
}

left.addEventListener("click",(event) => {
  let goingRight = snake_x == unitsize;

  if (!goingRight){
    snake_y = 0;
    snake_x = -unitsize;
  }
})

right.addEventListener("click",(event) => {
  let goingLeft = snake_x == -unitsize;

  if(!goingLeft){
    snake_y = 0;
    snake_x = unitsize;
    
  }
})

up.addEventListener("click",(event) => {
  let goingDown = snake_y == unitsize;

  if(!goingDown){
    snake_y = -unitsize;
    snake_x = 0;
  }
})

down.addEventListener("click",(event) => {
  let goingUp = snake_y == -unitsize;

  if(!goingUp){
    snake_y = unitsize;
    snake_x = 0;
  }
  console.log("xxxxxxxxx")
})



function create_food() {
  function random_food(min, max) {
    postion = Math.round((Math.random() * (max - min)) / unitsize) * unitsize;
    return postion;
  }
  foodX = random_food(0, bg_width-unitsize);
  foodY = random_food(0, bg_width-unitsize);
}

function draw_food() {
  canvas.fillStyle = foodColor;
  canvas.fillRect(foodX, foodY, unitsize, unitsize);
}

function check_game() {
  if (
    snake[0].x == 500 ||
    snake[0].x == -25 ||
    snake[0].y == 500 ||
    snake[0].y == -25
  ) {
    running = false;
  }

  for (i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
function reset() {
  running = true;
  score_text = 0;
  snake_x = unitsize;
  snake_y = 0;
  snake = [
    { x: unitsize * 4, y: 0 },
    { x: unitsize * 3, y: 0 },
    { x: unitsize * 2, y: 0 },
    { x: unitsize, y: 0 },
    { x: 0, y: 0 },
  ];
  startGame();
}

function gameOver() {
  canvas.font = "50px Cursive";
  canvas.fillText("Game Over", 130, 220);
}

function startGame() {
  running = true;
  create_food();
  next_trick();
}

function next_trick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      draw_food(); 
      drawSnake(); 
      moveSnake(); 
      check_game();
      next_trick();
    }, 100);
  } else {
    gameOver(); 
  }
}

startGame(); 
