//Create various variables

var Santa, SantaImg;
var Divyansh, DivyanshImg1, DivyanshImg2;
var divScore = 0;
var Aryansh, AryanshImg1, AryanshImg2;
var aryScore = 0;
var gift, gifts, g1, g2, g3, g4, g5, g6, g7;
var edges;
var bgImg;
var invisibleGround;
var bgMusic, yeahSound;

//Upload Images
function preload(){

//Background Image
  bgImg = loadImage("BG1.jpg");

  //Santa Image
  SantaImg = loadImage("Santa.png");

  //Images for gifts
  g1 = loadImage("G1.1.png");
  g2 = loadImage("G2.1.png");
  g3 = loadImage("G3.1.png");
  g4 = loadImage("G4.png");
  g5 = loadImage("G5.1.png");
  g6 = loadImage("G6.png");
  g7 = loadImage("G7.png");

  //Images for players
  DivyanshImg1 = loadImage("Div1.png");
  DivyanshImg2 = loadImage("Div2.png");

  AryanshImg1 = loadImage("Ary1.png");
  AryanshImg2 = loadImage("Ary2.png");

  //Loading sounds
  //Backgroud Sound
  bgMusic = loadSound("JingleBells.mp3");

  //Hit Sound
  yeahSound = loadSound("Yeah.wav");

  //Looping background sound
  bgMusic.looping = true;
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);

  bgMusic.play();
  
  Santa = createSprite(200, 150, 50, 50);
  Santa.addImage("Santa", SantaImg);
  Santa.scale = 0.3;
  Santa.velocityX = 7;


  Divyansh = createSprite(50, height-75, 50, 50);
  Divyansh.shapeColor = "red";
  Divyansh.addImage("Divyansh1", DivyanshImg1);
  Divyansh.addImage("Divyansh2", DivyanshImg2);
  Divyansh.scale = 0.5;

  Aryansh = createSprite(width-100, height - 75, 50, 50);
  Aryansh.shapeColor = "yellow";
  Aryansh.addImage("Aryansh1", AryanshImg1);
  Aryansh.addImage("Aryansh2", AryanshImg2);
  Aryansh.scale = 0.5;

  edges = createEdgeSprites();

  gifts = createGroup();

  invisibleGround = createSprite(width/2, height-3, width, 1);

  
 // Divyansh.debug = true;
 // Aryansh.debug = true;
}

function draw() {
  
  background(180);
  image(bgImg, 0, 0, width, height);


  Santa.bounceOff(edges);

  Aryansh.collide(invisibleGround);
  Divyansh.collide(invisibleGround);

  textSize(22);
  fill("white");
  text("Divyansh: " + divScore, width/2 - 250, 50);
  text("Aryansh: " + aryScore, width/2 + 250, 50);

  if (keyDown("LEFT_ARROW") || Aryansh.x >= width) {
    Aryansh.x -= 7;
    Aryansh.changeImage("Aryansh1");
  }

  if (keyDown("RIGHT_ARROW") || Aryansh.x <= 0) {
    Aryansh.x += 7;
    Aryansh.changeImage("Aryansh2");

  }

  if (keyDown("a") || Divyansh.x >= width) {
    Divyansh.x -= 7;
    Divyansh.changeImage("Divyansh2")
  }

  if (keyDown("d") || Divyansh.x <= 0) {
    Divyansh.x += 7;
    Divyansh.changeImage("Divyansh1")
  }

  if (keyDown("space")) {
    Divyansh.velocityY = -13;
  }
  Divyansh.velocityY += 0.9;


  if (keyDown("UP_ARROW")) {
    Aryansh.velocityY = -13;
  }
  Aryansh.velocityY += 0.9;
  
  spawnGifts();

  if (gifts.isTouching(Divyansh)) {
    yeahSound.play();
    divScore += 1;
    gift.remove();
  }
  if (gifts.isTouching(Aryansh)) {
    yeahSound.play();
    aryScore += 1;
    gift.remove();
  }

  if (aryScore > 0 && aryScore % 5 === 0 || divScore >0 && divScore % 5 === 0) {
    Santa.velocityX += 0.5;
  }
  drawSprites();
}

function spawnGifts(){
  if (frameCount % 150 === 0){
    gift = createSprite(600,100,10,40); 
   // gift.debug = true;
    gift.setCollider("circle", 0, 0, 10); 
    gift.x = Santa.x;
    gift.velocityY = 4.5;
    
     //generate random obstacles
     var rand = Math.round(random(1,7));
     switch(rand) {
       case 1: gift.addImage(g1); 
                              
               break;
       case 2: gift.addImage(g2);
               break;
       case 3: gift.addImage(g3);
               break;
       case 4: gift.addImage(g4);
               break;
       case 5: gift.addImage(g5);
               break;
       case 6: gift.addImage(g6);
               break;
       case 7: gift.addImage(g7);
               break;
                      
       default: break;
     }
    
     //assign scale and lifetime to the gift           
     gift.scale = 0.5;
     gift.lifetime = 350;
    
     gift.depth = Aryansh.depth;
     Aryansh.depth = Aryansh.depth + 1;

     gift.depth = Divyansh.depth;
     Divyansh.depth = Divyansh.depth + 1;

    //add each gift to the group
     gifts.add(gift);

    // gifts.overlap(Divyansh, surpriseD);
   //  gifts.overlap(Aryansh, surpriseA);
  }
 }

 /*function surpriseD(sprA){
        divScore += 1;
        sprA.remove();
 }

 function surpriseA(sprA){
        aryScore += 1;
        sprA.remove();
 }*/


/*

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
 if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}*/

