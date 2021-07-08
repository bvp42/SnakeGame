const canvas = document.getElementById("playground");
const ctx = canvas.getContext("2d");
const cuerpo = 25;
const canvasTam = 23;
var puntaje=0;
var fin=false;

//posicion inicial vibora
var snake=[];
snake[0]={

    x: Math.floor((canvasTam/2))*cuerpo,
    y: Math.floor((canvasTam/2))*cuerpo
}

//posicion comida
var comida={
    x:Math.floor(1+(Math.random()*(canvasTam-1)))*cuerpo,
    y:Math.floor(1+(Math.random()*(canvasTam-1)))*cuerpo
}

//Movimiento
var dir;
document.addEventListener("keydown",direction);

function direction(event){
    if(event.keyCode==37 && dir!="derecha"){
        dir = "izquierda";
    }
    if(event.keyCode==38 && dir!="abajo"){
        dir="arriba";
    }
    if(event.keyCode==39 && dir!="izquierda"){
        dir="derecha"
    }
    if(event.keyCode==40 && dir!="arriba"){
        dir="abajo";
    }
}



//Animación

function dibuja(){
    //fondo
    ctx.fillStyle="lightgreen";
    ctx.fillRect(cuerpo,cuerpo,canvasTam*cuerpo - cuerpo,canvasTam*cuerpo -cuerpo);
    //dibuja el cuerpo de la vibora
    for(var i=0;i<snake.length;i++){
        ctx.fillStyle="green";
        ctx.fillRect(snake[i].x,snake[i].y,cuerpo,cuerpo);
        //Cercioramos que la comida no se dibuje sobre la vibora
        if(snake[0].x==comida.x && snake[0].y==comida.y){
            comida = {
                x:Math.floor(1+(Math.random()*(canvasTam-1)))*cuerpo,
                y:Math.floor(1+(Math.random()*(canvasTam-1)))*cuerpo
            }
        }
    }
    //movimiento cabeza vibora
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    if(dir=="izquierda"){
        snakeX -= cuerpo;
    }
    if(dir=="derecha"){
        snakeX+= cuerpo;
    }
    if(dir=="arriba"){
        snakeY -= cuerpo;
    }
    if(dir=="abajo"){
        snakeY += cuerpo;
    }
    //crear cuerpo vibora
    var nuevaCabeza ={
        x: snakeX,
        y: snakeY
    };

    //Colisiones
    function colision(cbz,serpiente){
        for(var i=2;i < snake.length;i++){
            if((cbz.x == serpiente[i].x) && (cbz.y==serpiente[i].y)){
                return true;
            }
        }
        return false;
    }

    if(snakeX < cuerpo || snakeY < cuerpo ||
         snakeX >((canvasTam-1)*cuerpo) ||
         snakeY >((canvasTam-1)*cuerpo) ||((snake.length)>4&&
         colision(nuevaCabeza,snake))){
        clearInterval(juego);
        var fin=true;
    }

    //añade nuevos elementos al principio de un arreglo
    snake.unshift(nuevaCabeza);

     
    //comida
    if(snake[0].x==comida.x && snake[0].y==comida.y){
        puntaje += 1;
        comida = {
            x:Math.floor(1+(Math.random()*(canvasTam-1)))*cuerpo,
            y:Math.floor(1+(Math.random()*(canvasTam-1)))*cuerpo
        }
    }else{
        //borra el ultimo elemento
        snake.pop();
    }
    ctx.fillStyle = "red";
    ctx.fillRect(comida.x,comida.y,cuerpo,cuerpo);
    //Puntaje
    ctx.fillStyle ="white";
    ctx.font ="24px Arial";
    ctx.clearRect(0,0,400,25);
    ctx.fillText("Puntaje "+puntaje,cuerpo,0.8*cuerpo);
    if(fin){
        
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Fin del juego Puntuacion: "+puntaje,canvas.width/2,canvas.height/2);
    }
}
var juego = setInterval(dibuja,100);


