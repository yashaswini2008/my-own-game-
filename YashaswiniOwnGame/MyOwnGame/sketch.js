var PLAY = 1;
var END = 0;
var Over=2;
var gameState = PLAY;
var life= 5;

var girl, girlRunning, girlCollided;
var ground;

var obstaclesGroup;

var score = 0;
var gameoverImg,restartImg,book1Img,book2Img,appleImg,g1Img,g2Img,g3Img,g4Img,g5Img,g6Img,g7Img,medicineImg,milkImg,ob1Img,ob2Img,ob3Img,ob4Img,orangeImg,schoolImg,watermelonImg;
var jumpSound , checkPointSound, dieSound, bgSound;
var bgImg,milkImg,fruitImg,book1Img,book2Img,schoolImg

function preload(){
  //loading animations for girl
  girlRunning = loadAnimation ("g1.png","g2.png","g3.png","g4.png","g5.png","g6.png","g7.png")

  girlCollided = loadAnimation("gameover.png");
  medicineImg= loadImage("medicine.png");

  fruitImg= loadImage("apple.png");
  bgImg= loadImage("Forest1.jpg");
  milkImg= loadImage("milk.png");

  schoolImg= loadImage("school.png");
  book1Img= loadImage("book1.png");
  book2Img= loadImage("book2.png");
  obstacle1 = loadImage("ob1.png");
  obstacle2 = loadImage("ob2.png");
  obstacle3 = loadImage("ob3.png");
  obstacle4 = loadImage("ob4.png");


  restartImg = loadImage("reset.png");
  
  endImage=loadImage("end.png");
 jumpSound = loadSound("jump.mp3");
 dieSound = loadSound("gameover.mp3");
  checkPointSound = loadSound("gamend.mp3");
  bgSound= loadSound("bgm.mp3");
gameoverImg=loadImage("gameover.png");
}

function setup() {
  createCanvas(1200,500);
  // creating girl 
  girl = createSprite(100,220,10,10);
  girl.addAnimation("running", girlRunning);
  girl.addAnimation("collided", girlCollided);
  girl.setCollider("rectangle",0,0,150,250);
  girl.scale = 3;
  girl.debug= true
  girl.setCollider("circle",0,0,10)

  ground = createSprite(width/2,height-20,width*100,10);
  ground.visible= false;
  
  gameOver = createSprite(camera.position.x-400,height/2,200,200);
  gameOver.addImage("Over",gameOverImg);
  gameOver.scale = 1;
  
  restart = createSprite(camera.position.x -100,100);
  restart.addImage(restartImg);
  restart.debug = false;
  restart.scale = 0.5;
  
  end = createSprite(camera.position.x-400,200);
  end.addImage("the end",endImage);
  end.scale=1.5;

  school = createSprite(10000,250);
  school.addImage(schoolImg);
  school.scale=1;
  
  bgSound.loop()


  obstaclesGroup = createGroup();
  rewardsGroup = createGroup();
energyGroup= new Group()
  
  score = 0;

 
}

function draw() {
  
  background(bgImg);  

  camera.position.x = girl.x;

 

 ground.x=camera.position.x;
 



  end.x=camera.position.x;
  restart.x=camera.position.x-500;
  gameOver.x=camera.position.x-25;

  //displaying score
  fill("white")
  textFont("copperplate gothic");
  textSize(25);
  text("YOUR SCORE: "+ score,camera.position.x-350,28);
  text("LIFE:  "+ life,camera.position.x-350,68);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    end.visible=false;

  
  
  
    

    //jump when the space key is pressed
    if(keyDown("UP_ARROW")) {
      girl.velocityY = -20;
        jumpSound.play();
    }

    if(keyDown(RIGHT_ARROW)){
      girl.x= girl.x+20;
      score++
     
    }
    
    //add gravity
    girl.velocityY = girl.velocityY + 1.5
  
    //spawn the energy and reward
    spawnRewards();
    spawnEnergy()
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(girl)){
        
        gameState = END;
        dieSound.play();
    }
    if(rewardsGroup.isTouching(girl)){
        
     score = score + 10
     
  }
  if(energyGroup.isTouching(girl)){
        
  life= life + 1 
    
 }

    if(girl.x>9990){
      gameState=Over;
      checkPointSound.play()
    }

  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     girl.changeAnimation("collided", girlCollided);
    girl.scale=0.5
     girl.velocityY = 0
     girl.velocityX=0;
      ground.velocityX=0;
     
    
    obstaclesGroup.setLifetimeEach(-1);
    rewardsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     rewardsGroup.setVelocityXEach(0); 

   }else if(gameState===Over){
   
    obstaclesGroup.destroyEach();
    rewardsGroup.destroyEach();
    girl.destroy();
    school.destroy();
    end.visible=true;
    bgSound.stop()
   }

   

  girl.collide(ground);
  
  if(mousePressedOver(restart)) {
      reset();
    }


    drawSprites();    
}

function reset(){
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  rewardsGroup.destroyEach();
  girl.changeAnimation("running",girlRunning);
  score=0;
  girl.x=0;
  girl.scale=0.5

}


function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(camera.position.x +800,410,10,40);
   obstacle.velocityX =0;
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle1.addImage("ob1",obstacle1Img);
              obstacle.scale = 0.4;
              break;
      case 2: obstacle.addAnimation("ob2",obstacle2Img);
              obstacle.scale=1.5
              break;
      
      default: break;
    }
   
         
    
    obstacle.lifetime = 800;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnRewards() {
  //write code here to spawn the book1 and book2
  if (frameCount % 160 === 0) {
    var reward = createSprite(camera.position.x+Math.round(random(850,1000)),350,40,10);
   
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: reward.addImage(book1Img);
      reward.scale = 0.5;
              break;
      case 2: reward.addImage(book2Img)
      reward.scale= 0.93
              break;
      
      default: break;
    }
    
    reward.velocityX = 0;
    
    
    //adjust the depth
    reward.depth = girl.depth;
    girl.depth = girl.depth + 1;
    
    //add each cloud to the group
    rewardsGroup.add(reward);
  }
}

function spawnEnergy() {
  //write code here to spawn the milks and fruits
  if (frameCount % 160 === 0) {
    var energy = createSprite(camera.position.x+Math.round(random(850,1000)),350,40,10);
   
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: energy.addImage(milkImg);
      energy.scale = 0.5;
              break;
      case 2: energy.addImage(fruitImg)
      energy.scale= 0.93
              break;
      
      default: break;
    }
    
    energy.velocityX = 0;
    
    
    //adjust the depth
    energy.depth = girl.depth;
    girl.depth = girl.depth + 1;
    
    //add each cloud to the group
   energyGroup.add(energy);
  }
}

