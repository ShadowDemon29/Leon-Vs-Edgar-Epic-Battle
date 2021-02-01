var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("White Colour.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("Leon.jpg");
  ghostImg = loadImage("Edgar.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
 
  climbersGroup = new Group();
   
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage(ghostImg);
}

function draw(){
  background("white");
  if (gameState === "play") {

    
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("up")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnZeus();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(climbersGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
    fill ("Black")
    textSize(20)
    text("Dodge The Evil Leon Who Want's To Defeat You",70,70) 
    text("Don't Let Edgar Fall",70,95)
    text("Use the Arrow Keys to Move",70,115)
  }
  
  if (gameState === "end"){
    stroke("red");
    fill("Blue");
    textSize(50);
    text("Game Over", 210,250)
  }

}

function spawnZeus() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var climber = createSprite(200,10);
    climber.scale = 0.5
  
    
    climber.x = Math.round(random(120,400));
       
   
    climber.addImage(climberImg);
    
  
    climber.velocityY = 3;
    
    ghost.depth = climber.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    climber.lifetime = 800

    
    //add each door to the group
    climbersGroup.add(climber);
  }
}

