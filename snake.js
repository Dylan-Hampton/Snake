var canvas_x = 1000;
var canvas_y = 800;
var x = 0;
var y = 350;
var x_dim = 7;
var y_dim = 7;
var timer = 0;
var move_left = false;
var move_right = false;
var snake_dir = 'r';
var game = true;
var isRunning = false;

function toggleSnake()
{
    if(document.getElementById("toggle").value == "Start" && game)
    {
        if(timer == 0)
        {
            timer = setInterval(drawSnake, 250);
            isRunning = true;
        }
        document.getElementById("toggle").value = "Stop";
    }
    else
    {
        clearInterval(timer);
        isRunning = false;
        timer = 0;
        document.getElementById("toggle").value = "Start";
    }
}

function drawSnake()
{
    var context = document.getElementById("canvasId").getContext("2d");
    context.fillStyle = "#6ca6cd";
    context.rect(x, y, x_dim, y_dim); //creates next segment of the snake with x_dim and y_dim
    context.fill();

    //checks if the game would end next cycle
    if(checkBounds(x, y, x_dim, y_dim, snake_dir, context)) {
        game = false;
        clearInterval(timer);
        document.getElementById("toggle").value = "Start";
        document.getElementById("game").innerHTML = "Game Over! Reload page to try again!"
    }

    switch(snake_dir)
    {
        case 'l':
            if(!move_right && !move_left) {
                x -= x_dim; //move left
                snake_dir = 'l';
            } else if(move_right && !move_left) {
                y -= y_dim; //move up
                snake_dir = 'u';
                move_right = false;
            }
            else if(!move_right && move_left) {
                y += y_dim; //move down
                snake_dir = 'd';
                move_left = false;
            }
            break;

        case 'r':
            if(!move_right && !move_left) {
                x += x_dim; //move right
                snake_dir = 'r';
            } else if(move_right && !move_left) {
                y += y_dim; //move down
                snake_dir = 'd';
                move_right = false;
            }
            else if(!move_right && move_left) {
                y -= y_dim; //move up
                snake_dir = 'u';
                move_left = false;
            }
            break;

        case 'u':
            if(!move_right && !move_left) {
                y -= y_dim; //move up
                snake_dir = 'u';
            } else if(move_right && !move_left) {
                x += x_dim; //move right
                snake_dir = 'r';
                move_right = false;
            }
            else if(!move_right && move_left) {
                x -= x_dim; //move left
                snake_dir = 'l';
                move_left = false;
            }
            break;

        case 'd':
            if(!move_right && !move_left) {
                y += y_dim; //move down
                snake_dir = 'd';
            } else if(move_right && !move_left) {
                x -= x_dim; //move left (snake pov, controls inverted)
                snake_dir = 'l';
                move_right = false;
            }
            else if(!move_right && move_left) {
                x += x_dim; //move right (snake pov, controls inverted)
                snake_dir = 'r';
                move_left = false;
            }
            break;
    }
}

function checkBounds(x_pos, y_pos, xDim, yDim, dir, canvas)
{
    switch(dir)
    {
        case 'u': 
            if (canvas.getImageData(x_pos, (y_pos - yDim), 1, 1).data[0] > 0  || ((y_pos - yDim) < 0)) {
                return true;
            }
            break;

        case 'd':
            if (canvas.getImageData(x_pos, (y_pos + yDim), 1, 1).data[0] > 0 || ((y_pos + yDim) > canvas_y)) {
                return true;
            }
            break;

        case 'l':
            if(canvas.getImageData((x_pos - xDim), y_pos, 1, 1).data[0] > 0 || ((x_pos - xDim) < 0)) {
                return true;
            } 
            break;

        case 'r':
            if (canvas.getImageData((x_pos + xDim), y_pos, 1, 1).data[0] > 0 || ((x_pos + xDim) > canvas_x)) {
                return true;
            }
            break;
    }

    return false;
}

function moveLeft()
{
    if(isRunning)
    {
        move_left = true; 
    }
}

function moveRight()
{
    if(isRunning)
    {
        move_right = true; 
    }
}