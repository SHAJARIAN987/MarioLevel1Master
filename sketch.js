var Score=0;
var State="Play";
var t=0;
var l=0;
function preload(){
deadimage=loadAnimation("dead.png")
BGimage=loadImage("bgnew.jpg");
marioimage=loadAnimation("mar1.png"
,"mar2.png"
,"mar3.png"
,"mar4.png"
,"mar5.png"
,"mar6.png"
,"mar7.png");
Coinimage=loadAnimation("con1.png"
,"con2.png"
,"con3.png"
,"con4.png"
,"con5.png"
,"con6.png");
Mushimage=loadAnimation("mush1.png"
,"mush2.png"
,"mush3.png"
,"mush4.png"
,"mush5.png"
,"mush6.png");
Turimage=loadAnimation("tur1.png"
,"tur2.png"
,"tur3.png"
,"tur4.png"
,"tur5.png");
Brickimage=loadImage("brick.png");
DieSound=loadSound("dieSound.mp3");
CoinSound=loadSound("coinSound.mp3");
JumpSound=loadSound("jump.mp3");
ResButImg=loadImage("restart.png");
}

function setup() {
createCanvas(1000, 600);
ResBut=createSprite(500,300,80,30);
ResBut.addImage(ResButImg);
ResBut.scale=1; 
ResBut.visible=false;
BG=createSprite(500,300);
BG.addImage(BGimage);
BG.scale=0.5;
BG.velocityX=-6;
mario=createSprite(200,505,20,50);
mario.addAnimation("running",marioimage);
mario.scale=0.3;
ground = createSprite(200, 585, 400, 10);
ground.visible = false;
brickgroup=new Group();
Coingroup=new Group();
ObstacleGroup= new Group();
}
function draw() {
  if(State==="Play"){
    ResBut.visible=false;
  if(BG.x<100){
    BG.x=BG.width/4;
  }
  if(mario.x<200){
    mario.x=200;
  }
  if(mario.y<50){
    mario.y=50;
  }
  if(keyDown("space")){
    mario.velocityY=-16;
    if(l==0){
      JumpSound.play();
      l++
    }
  }
  if(!keyDown("space")){
    if(mario.y<505){
    mario.velocityY=16;
    l=0;
    }
    else if(mario.y==505){
      mario.velocityY=0;
    }
  }
  GB();
  for(var i=0;i<(brickgroup).length;i++){
    temp=brickgroup.get(i);
    if(mario.isTouching(temp)){
      mario.collide(temp);
    }
  }
  GC();
  for(var j=0;j<(Coingroup).length;j++){
    var tump=Coingroup.get(j);
    if(tump.isTouching(mario)){
      Score=Score+1;
      CoinSound.play();
      tump.destroy();
      tump=null;
    }
  }
  GenObstacles();
  if(mario.isTouching(ObstacleGroup)){
    State="End";
  }
  }  //end of if state
  else if(State==="End"){
    ResBut.visible=true;
    BG.velocityX=0;
    mario.velocityX=0;
    mario.velocityY=0;
    mario.addAnimation("running",deadimage);
    ObstacleGroup.setVelocityXEach(0);
    Coingroup.setVelocityXEach(0);
    brickgroup.setVelocityXEach(0);
    if(t==0){
      DieSound.play();
      t++;
    }
    if(mousePressedOver(ResBut)){
      Score=0;
      State="Play";
      t=0;
      l=0;
      ObstacleGroup.destroyEach();  
      Coingroup.destroyEach();  
      brickgroup.destroyEach();  
    }
  }
  mario.collide(ground);
  drawSprites();
  stroke("purple");
  textSize(20);
  text("Your Score:"+Score,800,500);
}
function GB(){
  if(frameCount%70==0){
  Brick=createSprite(1200,490,80,30);
  Brick.y=random(50, 450);
  Brick.addImage(Brickimage);
  Brick.scale=0.5;
  Brick.velocityX=-5;
  Brick.lifetime=250;
  brickgroup.add(Brick);
  }
}
function GC(){
  if(frameCount%80==0){
  var Coin=createSprite(1200,490,80,30);
  Coin.y=Math.round(random(80, 450));
  Coin.addAnimation("coin",Coinimage);
  Coin.scale=0.1;
  Coin.velocityX=-5;
  Coin.lifetime=1200;
  Coingroup.add(Coin);
  }
}
function GenObstacles(){
  if(frameCount%100==0){
    obstacle=createSprite(1200,551,10,40);
    obstacle.scale=0.2;
    obstacle.velocityX=-7;
    var rand=Math.round(random(1,2));
    switch(rand){
      case 1:
        obstacle.addAnimation("mush", Mushimage);
        break;
      case 2:
        obstacle.addAnimation("turtle", Turimage);
        break;
      default:
        break;
    }
    obstacle.lifetime=1000;
    ObstacleGroup.add(obstacle);
  }
}
