// this is the text the button will change the heading to when you click it
function updateText() {
    document.getElementById("heading").innerHTML = "JavaScript is fun!";
}
// this is the frst of the game code the game piece, the obstacles and the score
var myGamePiece;
var myObstacles = [];
var myScore;
// here we have the game pice which is the red box and then the socre is the text that will show in the game
function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}
// this is the game area where the game will be played and it will also update the gamearea and clear it and stop the game when you hit the obstacles
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 680;
        this.canvas.height = 470;
        this.context = this.canvas.getContext("2d");
       document.getElementById("game-container").appendChild(this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}
// this is the component function that will create the game piece and the obstacles give it movement and collision detection.
function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    // this is the update function that will update the game piece, obstacles and the score
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    // this is the collision detection for the game piece and the obstacles if they hit each other the game will stop
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}
// this is the update game area function that will update the gamearea and create the obstacles and move them and also update the score
function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }
    // this will clear the game area and then update the frame number and then create the obstacles and move them and also update the score
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "blue", x, 0));
        myObstacles.push(new component(10, x - height - gap, "pink", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedX = -3;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();
}
// this is the every interval function that will create the obstacles every 150 frames
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
// these are the functions that will move the game piece up down left and right when you click the buttons and also stop the movement when you dont click the buttons
function moveup() {
    myGamePiece.speedY = -2; 
}

function movedown() {
    myGamePiece.speedY = 2; 
}

function moveleft() {
    myGamePiece.speedX = -2; 
}

function moveright() {
    myGamePiece.speedX = 2; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
function resetGame() {
// this is the reset game function that will stop the game and clear everything.to start the game over and reset the score .
    myGameArea.stop();

    myGameArea.clear();
   
    myObstacles = [];
   
    myGameArea.frameNo = 0;
    
    myGamePiece.x = 10;
    myGamePiece.y = 120;
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    
    myScore.text = "SCORE: 0";
    myScore.update();

    myGameArea.start();
}