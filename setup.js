
/*Espaço do jogo (retângulo)*/
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box =32;

/*cobrinha*/
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction ="right";

/*foi criada após drawfood*/
let  food = {
    x: Math.floor(Math.random() * 15 + 1) * box, /* math.floor retira a parte flutuante do math.randon*/ 
    y: Math.floor(Math.random() * 15 + 1) * box /* math.randon retorna sempre um número aleatório até 1*/
}

/*função de criar o retângulo*/
function criarBG(){
    context.fillStyle ="Lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

/*criando a cobrinha*/
function criarCobrinha(){
    for ( i=0; i< snake.length; i++){
        context.fillStyle= "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

/*comida*/
function drawFood(){
    context.fillStyle = "orange";
    context.fillRect(food.x, food.y, box, box);/* um food na posição "x", outro na posição "y"*/
}

/*controle*/
document.addEventListener('keydown', update);/* "keydowm" é o evento de clicar*/

function update(event){
    /* se o botão for o 37 e a direção não for right, muda pra left e assim sucessivamente*/
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction !="down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction ="down";
/* Você vai apertar uma tecla, o addEventListener vai chamar o update e vai passar
como argumento o evento de tecla*/   
}


function iniciarJogo(){
    
/* se o valor de snake for 0, na posição "x" for maior que 15, a cobrinha vai
receber o valor de 0 e vai reaparecer na tela*/
    if(snake[0].x > 15 * box && direction == "right") snake [0].x = 0;
    if(snake[0].x < 0  && direction == "left") snake [0].x = 16* box;
    if(snake[0].y > 15 * box && direction == "down")snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up")snake[0].y = 16 * box;


    for (i =1; i< snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over !");
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    /*posição da cobrinha*/
    let snakeX= snake[0].x;
    let snakeY= snake[0].y;

    /*como a cobrinha vai andar, se à direita, acrescenta q quadradinho.
    Se à esquerda, perde um quadradinho. Se para cima, perde um quadradinho.
    Se para baixo, acrescenta um quadradinho.*/
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;


    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{food.x = Math.floor(Math.random() * 15 + 1) * box; /* math.floor retira a parte flutuante do math.randon*/ 
         food.y = Math.floor(Math.random() * 15 + 1) * box; /* math.randon retorna sempre um número aleatório até 1*/
    }
    
    
    /*função de sempre acrescentar na frente*/
    let newHead = {
        x: snakeX, 
        y: snakeY
    }

    snake.unshift(newHead);
}


/*intervalo de 100 ms para iniciar o jogo e a cada 100 ms, dará continuidade sem o jogo travar*/
let jogo= setInterval(iniciarJogo,100);

