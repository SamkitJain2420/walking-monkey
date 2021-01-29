
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup
var score
var survivalTime=0
var invisibleGround
var obstacleGroup

function preload(){
  
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,600);
  monkey=createSprite(80,315,20,20);
  
  monkey.addAnimation("moving",monkey_running)
 monkey.scale=0.1
  
  ground=createSprite(400,350,900,10)
  ground.velocityX=-4
  ground.x=ground.width/2
  console.log(ground.x)
  
  

  
score=0
  
  //invisibleGround=createSprite(200,190,400,10)
  //invisibleGround.visible=false;
  
  obstacleGroup=new Group()
  foodGroup=new Group()
  
  //banana.y=Math.round(random(120,240))
 // banana.velocityX=-4

  
}


function draw() {
  background("green")
  if(ground.x<0)
    ground.x=ground.width/2
  if(keyDown("space")&&monkey.y>=100){
    monkey.velocityY  =-12

  }
    monkey.velocityY = monkey.velocityY+0.8
  monkey.collide(ground)
  spawnFood();
  spawnObstacles();
  
    drawSprites();
  stroke("black")
  textSize(20)
  fill("white")
  text("Score:"+score,500,50)
  if(obstacleGroup.isTouching(monkey))
    { 
      ground.velocityX=0                    
     monkey.velocityY =0
      text("GameOver",300,350);
      obstacleGroup.setVelocityXEach(0)
     foodGroup.setVelocityXEach(0)
      ground.velocityX=0
      foodGroup.setLifetimeEach(-1)
       obstacleGroup.setLifetimeEach(-1)
     
    }
     
  
      
       stroke("black");
  textSize(20)
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,100,50)
    

if(foodGroup.isTouching(monkey)){
  //text("Score =",350,350)
  score=score+1
  foodGroup.destroyEach();
}


}
function spawnFood(){
  if(frameCount%80===0){
    banana=createSprite(600,250,40,10)
    banana.y=Math.round(random(120,200));
    banana.velocityX=-5
    banana.lifetime=300
    monkey.depth=banana.depth+1
  banana.addImage(bananaImage)
  banana.scale=0.1
    foodGroup.add(banana)
}
}
function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(800,320,10,40)
    obstacle.velocityX=-6
    obstacle.lifetime=300
    
obstacle.addImage(obstacleImage)
  obstacle.scale=0.1
    obstacleGroup.add(obstacle)
}
}





